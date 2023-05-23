from elasticsearch import Elasticsearch

# Connect to Elasticsearch
es = Elasticsearch(hosts="http://localhost:9200")

# Create an index to store function names
index_name = "function_index"

# Check if the index already exists
is_index_exists = es.indices.exists(index=index_name)

index_settings = {
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0,
        "analysis": {
            "analyzer": {
                "my_analyzer": {
                    "type": "custom",
                    "tokenizer": "standard",
                    "filter": ["lowercase", "stemmer"],
                }
            },
            "filter": {"stemmer": {"type": "stemmer", "name": "english"}},
        },
    },
    "mappings": {
        "properties": {"function_name": {"type": "text", "analyzer": "my_analyzer"}}
    },
}

# Create the index

if is_index_exists:
    es.indices.delete(index=index_name)

es.indices.create(index=index_name, body=index_settings)

# Sample function data
function_data = [
    {
        "function_name": "login(args)",
        "description": "handles the login of the user to the website",
    },
    {
        "function_name": "logout()",
        "description": "logs out the currently logged-in user",
    },
    {
        "function_name": "create_user()",
        "description": "creates or signup a new user account",
    },
    {
        "function_name": "create_campaign(args)",
        "description": "creates a new campaign",
    },
]

# Index the function data
for data in function_data:
    es.index(index=index_name, body=data)


def find_executable_function(user_query, args):
    # Perform a search in Elasticsearch
    search_body = {
        "query": {
            "match": {"description": {"query": user_query, "analyzer": "my_analyzer"}}
        }
    }

    search_results = es.search(index=index_name, body=search_body)

    # Extract the matched function name and description
    if search_results["hits"]["total"]["value"] > 0:
        matched_function = search_results["hits"]["hits"][0]["_source"]["function_name"]
        matched_description = search_results["hits"]["hits"][0]["_source"][
            "description"
        ]
        print(f"Matched function: {matched_function}")
        print(f"Description: {matched_description}")

        function_with_args = matched_function.replace("args)", "")

        for arg in args:
            function_with_args += f"'{arg}',"

        if function_with_args[-1] == ",":
            function_with_args = function_with_args[:-1]

        function_with_args += ");"

        return {
            "function_name": matched_function.replace("()", ""),
            "function_with_args": function_with_args,
        }
    else:
        print("No matching function found.")
        return None
