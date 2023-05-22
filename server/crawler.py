import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin


def get_all_urls(url, max_depth=1, current_depth=1):
    if current_depth > max_depth:
        return set()

    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, "html.parser")
        urls = set()
        for link in soup.find_all("a"):
            href = link.get("href")
            if href and not href.startswith("#"):
                absolute_url = urljoin(url, href)
                urls.add(absolute_url)
                # Recursively crawl URLs
                print(f"Crawling {absolute_url} at depth {current_depth + 1}")
                urls.update(get_all_urls(absolute_url, max_depth, current_depth + 1))
        return urls
    else:
        print(f"Failed to fetch URL: {url}")
        return set()
