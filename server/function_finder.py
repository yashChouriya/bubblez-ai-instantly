from elasticsearch import Elasticsearch

# Connect to Elasticsearch
es = Elasticsearch(hosts="http://localhost:9200")

# Create an index to store function names
index_name = "function_index"

# Check if the index already exists
is_index_exists = es.indices.exists(index=index_name)

# Elasticsearch index settings
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
    "mappings": {"properties": {"func": {"type": "text", "analyzer": "my_analyzer"}}},
}

# Create the index

if is_index_exists:
    es.indices.delete(index=index_name)

es.indices.create(index=index_name, body=index_settings)

# Sample function data
function_data = {
    "login": {
        "func": "login",
        "number_of_args": "2",
        "description": "Function to log in to the system.",
        "args_ask_message": "Please share your email and password in the following format:\n\njohn@example.com,kahnak@ak#",
        "url": "https://app.instantly.ai/auth/login",
    },
    "logout": {
        "func": "logout",
        "number_of_args": "0",
        "description": "Function to log out of the system.",
        "args_ask_message": "Do you want to log out? Enter Yes or No.",
        "url": "https://app.instantly.ai/app/accounts",
    },
    "addNewCampaign": {
        "func": "addNewCampaign",
        "number_of_args": "1",
        "description": "Function to add or create a new campaign.",
        "args_ask_message": "Please enter a campaign name",
        "url": "https://app.instantly.ai/app/campaigns",
    },
    "deleteCampaign": {
        "func": "deleteCampaign",
        "number_of_args": "1",
        "description": "Function to delete a campaign.",
        "args_ask_message": "Please enter a campaign id",
        "url": "https://app.instantly.ai/app/campaigns",
    },
    "downloadCampaignAnalytics": {
        "func": "downloadCampaignAnalytics",
        "number_of_args": "1",
        "description": "Function to download campaign analytics.",
        "args_ask_message": "Please enter a campaign name",
        "url": "https://app.instantly.ai/app/campaigns",
    },
    "enableOrDisableEmailWarmup": {
        "func": "enableOrDisableEmailWarmup",
        "number_of_args": "1",
        "description": "Function to enable or disable email warm-up.",
        "args_ask_message": "Please enter an email",
        "url": "https://app.instantly.ai/app/accounts",
    },
    "exportCampaignFile": {
        "func": "exportCampaignFile",
        "number_of_args": "1",
        "description": "Function to export a campaign file.",
        "args_ask_message": "Please enter a campaign name",
        "url": "https://app.instantly.ai/app/campaigns",
    },
    "forgotPasswordRequest": {
        "func": "forgotPasswordRequest",
        "number_of_args": "1",
        "description": "Function to request a new password.",
        "args_ask_message": "Please enter an email",
        "url": "https://app.instantly.ai/auth/login",
    },
    "getShareableCampaignLink": {
        "func": "getShareableCampaignLink",
        "number_of_args": "1",
        "description": "Function to get a shareable campaign link.",
        "args_ask_message": "Please enter a campaign name",
        "url": "https://app.instantly.ai/app/campaigns",
    },
    "openBillingsPage": {
        "func": "openBillingsPage",
        "number_of_args": "0",
        "description": "Function to open the billing page.",
        "args_ask_message": "Do you want to open the billing page? Enter Yes or No.",
        "url": "https://app.instantly.ai/app/accounts",
    },
    "openEmailSetting": {
        "func": "openEmailSetting",
        "number_of_args": "1",
        "description": "Function to open email settings.",
        "args_ask_message": "Please enter an email",
        "url": "https://app.instantly.ai/app/accounts",
    },
    "startProductTour": {
        "func": "startProductTour",
        "number_of_args": "0",
        "description": "Function to start a product tour.",
        "args_ask_message": "Do you want to start the product tour? Enter Yes or No.",
        "url": "https://app.instantly.ai/app/accounts",
    },
    "updateCampaignName": {
        "func": "updateCampaignName",
        "number_of_args": "1",
        "description": "Function to update a campaign name.",
        "args_ask_message": "Please enter a campaign name",
        "url": "https://app.instantly.ai/app/campaigns",
    },
    "updateUsersEmail": {
        "func": "updateUsersEmail",
        "number_of_args": "1",
        "description": "Function to update the user's email.",
        "args_ask_message": "Please enter an email",
        "url": "https://app.instantly.ai/app/accounts",
    },
    "updateUsersName": {
        "func": "updateUsersName",
        "number_of_args": "2",
        "description": "Function to update the user's name.",
        "args_ask_message": "Please share your first name and last name in the following format:\n\njohn,Doe",
        "url": "https://app.instantly.ai/app/accounts",
    },
    "updateCurrentWorkspaceName": {
        "func": "updateCurrentWorkspaceName",
        "number_of_args": "1",
        "description": "Function to update the current workspace name.",
        "args_ask_message": "Please enter a workspace name",
        "url": "https://app.instantly.ai/app/accounts",
    },
    "addNewMemberInWorkspace": {
        "func": "addNewMemberInWorkspace",
        "number_of_args": "1",
        "description": "Function to add or create a new member in the workspace.",
        "args_ask_message": "Please enter an email for the new member",
        "url": "https://app.instantly.ai/app/accounts",
    },
}


# Index the function data
for function_name, function in function_data.items():
    es.index(index=index_name, body=function, id=function_name)


def find_executable_function(user_query):
    # Perform a search in Elasticsearch
    search_body = {
        "query": {
            "match": {"description": {"query": user_query, "analyzer": "my_analyzer"}}
        }
    }

    search_results = es.search(index=index_name, body=search_body)

    # Extract the matched function name and description
    if search_results["hits"]["total"]["value"] > 0:
        source = search_results["hits"]["hits"][0]["_source"]
        print(source)
        return source
    else:
        print("No matching function found.")
        return None
