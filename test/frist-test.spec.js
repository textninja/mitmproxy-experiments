import childprocess from 'child_process';
import axios from 'axios';

describe("response killer", () => {
    let subprocess;

    beforeAll(async () => {
        subprocess = await startProxyWithScript('scripts/kill-everything.py');
    });

    it("should hang up when requesting google", async () => {
        await expect(async () => {
            await axios.get(
                "https://www.google.com",
                {
                    "proxy": {
                        "host": "localhost",
                        "port": 8080
                    }
                }
            );
        })
            .rejects
            .toThrow("socket hang up");
    });

    afterAll(() => {
        subprocess.kill();
    });
});

async function startProxyWithScript(script) {
    let subprocess = childprocess.spawn(
        'mitmdump',
        ['-s', script]
    );

    await new Promise((resolve) => {
        let stdoutBuffer = '';

        function waitForListeningMessage(chunk) {
            stdoutBuffer += chunk.toString("utf8");
            if (stdoutBuffer.match(/listening at http:\/\/\*:8080/)) {
                subprocess.stdout.off('data', waitForListeningMessage);
                resolve(true);
            }
        }

        subprocess.stdout.on('data', waitForListeningMessage);
    });

    return subprocess;
}
