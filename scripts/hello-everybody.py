from bs4 import BeautifulSoup

class ModifyTitle:
    def __init__(self, title="hello world"):
        self.title = title

    def response(self, flow):
        content_type = flow.response.headers.get(b"content-type", "")
        if content_type.startswith("text/html"):
            soup = BeautifulSoup(flow.response.content, "html.parser")
            title = soup.select_one("title")
            if title:
                title.string = "hello world"
            flow.response.content = str(soup).encode("utf-8")

addons = [
    ModifyTitle()
]
