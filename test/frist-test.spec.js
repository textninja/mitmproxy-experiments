import childprocess from 'child_process';

describe("frist test", () => {
    let subprocess;

    beforeAll(async () => {
        subprocess = childprocess.spawn(
            'mitmdump',
            ['-s', 'scripts/kill-everything.py']
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
    });

    it("should work", () => {
        expect(1).toEqual(1);
    });

    afterAll(() => {
        subprocess.kill();
    });
});
