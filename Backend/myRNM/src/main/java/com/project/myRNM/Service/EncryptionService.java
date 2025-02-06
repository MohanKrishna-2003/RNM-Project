package com.project.myRNM.Service;

import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Service
    public class EncryptionService {
        private static final String SECRET_KEY = "mySecureRealTimeKey";

        // Decrypt email using AES
        public String decryptEmail(String encryptedEmail) throws Exception {
            // Ensure the secret key is 16 bytes
            SecretKeySpec key = new SecretKeySpec(SECRET_KEY.getBytes(), "AES");

            // The IV must match the one used on the frontend (16 bytes, same as '1234567890123456')
            IvParameterSpec iv = new IvParameterSpec("1234567890123456".getBytes());  // Same IV as in frontend

            // Initialize the cipher for AES decryption (CBC mode, PKCS5 padding)
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, key, iv);

            // Decode the encrypted email (base64) from the frontend
            byte[] decodedBytes = Base64.getDecoder().decode(encryptedEmail);

            // Decrypt the email
            byte[] decryptedBytes = cipher.doFinal(decodedBytes);
            return new String(decryptedBytes);  // Return the decrypted email
        }
    }

