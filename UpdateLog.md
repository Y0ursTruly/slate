Version 0.9.5: enabled the server files to not need any npm packages
Version 0.9.6: needed ngrok installed to run, which gives server access across internet. No static mainserverlocation yet
Version 0.9.7: fixed need for rounding in encryption system, which could've lead to incorrect decryption in the future
Version 0.9.8: added 'JSON' folder which would soon introduce cool features for the user in the future, but only mainserver json files are in so far
Version 0.9.9: added PEC (Private Encryption Configuration) settings, LOTS of bug fixes(including error handling), almost all communication of EVERY area encrypted and a different bar shows when you send a message compared to when another user sends a message
Version 1.0.0: Slate is fully functional (took a while to fix the bugs especially the PEC system), just to add other features in future (If this picks up)
Version 1.0.1: Removed test_server1, renamed test_server2 to Slate (to be less complicated), added "SlateSourceCode.txt" which contains source code minus the encryption algorithm (for security reasons) ~ testing can now begin
Version 1.0.2: Also called 'Simultaneous Login Fix' because it removed glitch where a user can log in on separate accounts simultaneously on one device
Version 1.0.3: All online communications in Slate, even the Values of EVERY header are all ENCRYPTED
Version 1.0.4: Bug Fixes, main one being no overlap between encrypted communication between user to user AND user and main-server
Version 1.0.5: Added a Windows executeable along with the Linux executeable of Slate, also added all the dependencies for program execution ready-made. Also, closing browser connection triggers the shell process to end, ensuring user doesn't keep shell process on accidentally