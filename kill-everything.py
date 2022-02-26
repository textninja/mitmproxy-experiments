from mitmproxy import ctx

class Killer:
    def request(self, flow):
        flow.kill()

addons = [
    Killer()
]
