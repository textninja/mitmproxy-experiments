import childprocess from 'child_process';

describe("frist test", () => {
    let subprocess;

    beforeAll(() => {
        subprocess = childprocess.spawn(
            'mitmdump',
            ['-s', 'kill-everything.py']
        );

        subprocess.stdout.on('data', (chunk) => {
            process.stdout.write(chunk);
        });
    });

    it("should work", async () => {
        expect(1).toEqual(1);
        await new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
        expect(1+1).toEqual(2);
    });

    afterAll(() => {
        subprocess.kill();
    });
});
