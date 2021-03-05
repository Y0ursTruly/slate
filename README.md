# Slate
What's said here is stored nowhere
#
This Communication Build has user to user communication main-server INDEPENDENT (your user to user messages wont even reach my main-server)
#
Communications from user to user are ENCRYPTED, TUNNELED and PROXIED while the main-server only acts as a white board for your device to know which devices it can communicate with
#
This is made for LIVE communication. This is because I (at least) do NOT store message data whatsoever, so it will be GONE after a single reload
#
After a reload, it's a Clean Slate

## Setup
It may take a while, but make sure everything is downloaded(extra setup that was needed is taken away)

## Running
To run, activate the executeable file that has the name of your Operating System in it. AFTER this, open up a tab on "localhost:8082" and you will be connected

## Please Note
There is no static mainserverlocation yet. As the updates keep coming, the main server's location is going to change, so you might want to stay updated(as of recent, those changes are going to become rather RARE). My email is paulrytaylor@gmail.com for questions(or if u want to tell me to use source code instead of executeables)
#
IF for some reason you closed/reloaded the browser tab(the one on "localhost:8082"), it is VERY LIKELY that the shell part(the running executeable) would shut down(to ensure that you don't leave it still running by accident). To anyone using my software, my question is: IS THIS A GOOD FEATURE?

## Private Encryption Configuration(PEC)
For The Private Encryption Configuration(PEC) option you would see in the your browser(Once Logged In) is taking advantage of a third aspect of the encryption for Slate.
<br>There is are some example (1 *Custom* and 1 *Normal*) groups you can try: **My Chat**(*Normal one*) and **Custom Chat**(*Custom one*)
#
<br>For **My Chat**, make sure the *PEC* option is set to *no*(it is like this as default) and the password is *asdf*
<br>For **Custom Chat**, make sure the *PEC* option is set to *yes* and the password is *don't enter*. The PEC config file(*I also call it a ledger*) comes with this repository
<br>*However you can experiment using 2 machines with different ledgers(different config files for PEC), then instead of a message and you will see the system text basically saying that it can't decrypt received message*
#
The *Custom one* uses the **Private Encryption Configuration** and you will see the respective *(Custom Chat).json* file in the *JSON* folder
<br>This third aspect of the Slate encryption uses a *"PEC config file", or "ledger"* which is basically a different *alphabet* that the encryption system would work with. The *().json* file is the default *ledger*(for communicating to mainserver)
<br>Because of this ledger system, even if you have the password for a group, if you don't have their ledger, the information would still be scrambled like eggs to you
#
With the simple change of the 'alphabet' it uses and the encryption changes form drastically. So in the future, even if the encryption method is known, the secrecy granted by the encryption would still be potent.
## Making a Group with PEC
If you are making a group with it, click the 'Create Config File for PEC' button. A prompt would come up and there you put in the EXACT name of the group it is for.
## Joining a Group with PEC
If it is a group you want to join, I would assume they gave you a (ChatName).json file. Put this file in your JSON folder. 

## Source Code Advisory
There is a file called "SlateSourceCode.txt" which contains the source code of the "Slate" executable minus the encryption algorithm (for security reasons)
