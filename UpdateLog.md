Version 0.9.5: enabled the server files to not need any npm packages
#
Version 0.9.6: needed ngrok installed to run, which gives server access across internet. No static mainserverlocation yet
#
Version 0.9.7: fixed need for rounding in encryption system, which could've lead to incorrect decryption in the future
#
Version 0.9.8: added 'JSON' folder which would soon introduce cool features for the user in the future, but only mainserver json files are in so far
#
Version 0.9.9: added PEC (Private Encryption Configuration) settings, LOTS of bug fixes(including error handling), almost all communication of EVERY area encrypted and a different bar shows when you send a message compared to when another user sends a message
#
Version 1.0.0: Slate is fully functional (took a while to fix the bugs especially the PEC system), just to add other features in future (If this picks up)
#
Version 1.0.1: Removed test_server1, renamed test_server2 to Slate (to be less complicated), added "SlateSourceCode.txt" which contains source code minus the encryption algorithm (for security reasons) ~ testing can now begin
#
Version 1.0.2: Also called 'Simultaneous Login Fix' because it removed glitch where a user can log in on separate accounts simultaneously on one device
#
Version 1.0.3: All online communications in Slate, even the Values of EVERY header are all ENCRYPTED
#
Version 1.0.4: Bug Fixes, main one being no overlap between encrypted communication between user to user AND user and main-server
#
Version 1.0.5: Added a Windows executeable along with the Linux executeable of Slate, also added all the dependencies for program execution ready-made. Also, closing browser connection triggers the shell process to end, ensuring user doesn't keep shell process on accidentally
#
Version 1.0.6: What the user types is seen as text and not html(this problem existed and the solution was to switch WHERE the text gets the element properties from shell to browser)
#
Version 1.0.7: Bug Fixes: if browser tab reloading, shell won't close, useless "afk" system from client to localhost commented out, situations made by worst test cases for PEC communication fixed, reload works smoothly(doesn't "keep you logged in")
#
Version 1.0.8: source code used instead of executables, and when the program is loaded, an attempt is made to AUTOMATICALLY navigate to 'localhost:8082'. If action is not possible, the program would ask you to MANUALLY navigate to 'localhost:8082' instead. This version would be the first publish as an npm package
#
Version 1.0.9: The server side accounts have been reset, the encryption method slightly tweaked(and now for communicating with server has a public and private key setup) which means *this is pretty cool* >:D
#
Version 1.0.95: automated startup(running the JavaScript file in nodejs is all that's needed)
#
Version 1.0.96: fix in automated startup(where the unbeforeunload part in browser didn't work properly from update 1.0.95)
#
Version 1.0.98: added documentation/description on how the homemade encryption method works
