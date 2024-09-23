const {
  ab2str, str2ab, bfr2str, str2bfr, arraysEqual, aes_enc, aes_dec,
  rsa_encrypt, rsa_decrypt, get_RSA_keys, make_RSA_keys, remove_RSA_keys,
  seal_encrypt, seal_decrypt, seal_add, seal_init, get_SEAL_keys, make_SEAL_keys, remove_SEAL_keys
} = require('./encryption');
const test=require('node:test'), assert=require('node:assert');
(async function(){
  await test("SEAL Homomorphic Encryption Scheme Tests",async function(t){
    await t.test("Initialisation",async function(){
      await seal_init()
    })
    await t.test("Key Generation",async function(){
      assert.ok(Array.isArray(make_SEAL_keys("homomorphic")), "array of [prv,pub] was not returned")
    })
    await t.test("Encryption",async function(){
      const [prv,pub]=get_SEAL_keys("homomorphic")
      const plaintext="asdf", ciphertext=seal_encrypt(plaintext,pub)
      const decrypted=seal_decrypt(ciphertext,prv).substring(0,plaintext.length)
      assert.strictEqual(decrypted,plaintext, "decryption did not work")
    })
    await t.test("Addition",async function(){
      const [prv,pub]=get_SEAL_keys("homomorphic")
      const plain_text1="aaaaa", plain_text2="aaaa", added="ÂÂÂÂa"
      const cipher_text1=seal_encrypt(plain_text1,pub), cipher_text2=seal_encrypt(plain_text2,pub)
      const combined_ciphertext=seal_add(cipher_text1,cipher_text2)
      const decrypted=seal_decrypt(combined_ciphertext,prv).substring(0,plain_text1.length)
      console.log(decrypted)
      assert.strictEqual(decrypted,added, "addition did not work")
    })
    remove_SEAL_keys("homomorphic")
  })
  //other tests such as RSA and what not
})()