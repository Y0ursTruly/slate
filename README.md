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

## To Note
- This version(1.0.9) hopefully would be the last update to the general method of how the client(this) and the server communicate.. this means that I can finally call this encryption method an `asynchronous` one
- Yes it does sound cringey but I would like your feedback from anyone who uses it.. feel free to contact me at [paulrytaylor@gmail.com](mailto:paulrytaylor@gmail.com)
- For info on the update history, make sure to check out *[my update log](https://github.com/Y0ursTruly/slate/blob/master/UpdateLog.md)*
- I know I say it in the *[setup](#setup)* header but since this is source code, you would need *[node.js](https://nodejs.org/)*

## Setup
- Make sure you have installed *[node.js](https://nodejs.org/)* since that's what the javascript files run on
- Download *[github repository as ZIP](https://github.com/Y0ursTruly/slate/archive/refs/heads/master.zip)*, `github clone --depth=1 https://github.com/Y0ursTruly/slate.git`, OR `npm install the-slate`

## Running
For any method of installation, running this has the same concept, `node path/to/slate.js`

## Private Encryption Configuration(PEC)
For The Private Encryption Configuration(PEC) option you would see in the your browser(Once Logged In) is taking advantage of a third aspect of the encryption for Slate.
<br>There are some examples (1 *Custom* and 1 *Normal*) groups you can try: **My Chat**(*Normal one*) and **Custom Chat**(*Custom one*)
### Examples Begin
- For **My Chat**, make sure the **PEC** option is set to ***no***(it is like this as default) and the password is ***asdf***
- For **Custom Chat**, make sure the **PEC** option is set to ***yes*** and the password is ***don't enter***
<br>The PEC config file(*I also call it a ledger*) comes with this repository
<br>*However you can experiment using 2 machines with different ledgers(different config files for PEC), then instead of a message and you will see the system text basically saying that it can't decrypt received message*
### Examples End
The *Custom one* uses the **Private Encryption Configuration** and you will see the respective *(Custom Chat).json* file in the *JSON* folder
<br>This third aspect of the Slate encryption uses a *"PEC config file", or "ledger"* which is basically a different *alphabet* that the encryption system would work with. The *().json* file is the default *ledger*(for communicating to mainserver)
<br>Because of this ledger system, even if you have the password for a group, if you don't have their ledger, the information would still be inaccessible to you
#
With the simple change of the 'alphabet' it uses and the encryption changes form drastically. So there can be literally several people in a room *that uses PEC*(the very same room), and if they each have different ledgers, they won't be able to read each others' messages
## Making a Group with PEC
If you are making a group with it, click the 'Create Config File for PEC' button. A prompt would come up and there you put in the EXACT name of the group it is for
## Joining a Group with PEC
If it is a group you want to join, I would assume they gave you a (ChatName).json file. Put this file in your JSON folder
