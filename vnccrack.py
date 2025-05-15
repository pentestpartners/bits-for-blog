from Crypto.Cipher import DES
import binascii

# Set known challenge and response
challenge_hex = sys.argv[1]
response_hex = sys.argv[2]

challenge_bytes = binascii.unhexlify(challenge_hex)
expected_response = binascii.unhexlify(response_hex)

# Example Passwords to test
passwords = ["123456", "admin", "letmein", "vnc123", "password", "secret", "guest"]

def des_encrypt(key, data):
    """Encrypts data using DES with the given key"""
    key = (key + "\x00" * 8)[:8]  # pad or truncate to 8 bytes
    key = bytes([int('{:08b}'.format(b)[::-1], 2) for b in key.encode('latin-1')])  # bit-reverse
    cipher = DES.new(key, DES.MODE_ECB)
    return cipher.encrypt(data)

# Try each password
for pwd in passwords:
    enc = des_encrypt(pwd, challenge_bytes)
    if enc == expected_response:
        print(f"[+] Password found: {pwd}")
        break
else:
    print("[-] No matching password found.")

