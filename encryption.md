# Encryption Method(detailed description of how it works)
- Firstly, I must mention that there are really `3` parts to the encryption and not just `2`.. these are: *code, text, ledger*
## Encryption
- The *code* and the *text* are translated to numerical values due to their text placing in the `alphabet` of the *ledger*
- Then, the *code* and the *text* are treated as 2 matrices(the *text* is split up into twice the length but adds up to the same text) with *text* always having `2` rows and *code* always having `2` columns
- These matrices are then multiplied, creating a new `matrix` and each value is mapped by a function that converts those numbers to text based on the `alphabet` of the *ledger*(and the alphabet's length too, since it's similar to decimal to other base conversion) combined with the *code*(so that the password influences the mapping too)
- This is finally joined up using special characters from the *ledger* and the output string is the encryption

## Decryption
- The *text* is split up using special characters from the *ledger* while the *code* is translated to numerical values due to their text placing in the `alphabet` of the *ledger*
- The *text* is then mapped with a function that converts those texts to numbers based on the `alphabet` of the *ledger*(the alphabet's length too, since it's similar to other base to decimal conversion) along with the *code*(because without this part, the numbers converted would be erroneous since it influenced the mapping when encryption was occuring)
- A `simultaneous equation` is used in knowledge with the *code* to regain the text from the multiplied `matrix` and the text is then added back(remember the ledger made from the text was turned into twice the length when encrypting)
- The *text* is then translated to text values from the numeric values based on their index placing in the `alphabet` of the *ledger* and the output string is the decryption

## Current Implementations(Slate)
- **User to Server**: 
<br>- Upon not having a set of keys for a slate mainserver(like one seen in [mainserverlocation.txt](https://github.com/Y0ursTruly/slate/blob/master/mainserverlocation.txt)), which should only occur upon installation, your client asks for keys and sends an rsa public key, then the server uses that key to encrypt a public number, a private key and private ledger which would be used for the rest of server communications..
<br>- Now for loading it any time after and any other interaction ever(unless you lose your keys), that private set of keys(the private key and private ledger) is never shared again and user and server communicate in their own little world and all the client does is share a public number and both sides know what to do
- **User to User**:
<br>- The mainserver gives clients a list of who is in the same Chat Room, then the clients communicate with each other through sending requests to the users of that list.. however users would only see messages if they share the same ledger(ledgers formed and used are server independent)
- **Server Storage**:
<br>- Passwords are never stored, but passwords are used to encrypt text and logins are verified if a password correctly decrypts text
