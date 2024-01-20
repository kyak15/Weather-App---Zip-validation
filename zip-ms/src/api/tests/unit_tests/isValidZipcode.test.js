import { isValidZipcode } from "../../controllers/controllers";

test('empty input returns false', async () => {
    expect(await isValidZipcode('')).toBe(false);
})

test('valid zipcode returns true', async () => {
    expect(await isValidZipcode('01930')).toBe(true);
})

test('valid zipcode starting and ending with whitespace returns true', async () => {
    expect(await isValidZipcode('  01930 ')).toBe(true);
})

test('zipcode with letters returns false', async () => {
    expect(await isValidZipcode('abcde')).toBe(false);
})