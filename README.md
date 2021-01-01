# hostscan 

Port scanner built with electron framework:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.

## Use

Just put an IP address into an input field and press >>ENTER<<

```bash
# Clone this repository
git clone https://github.com/drozdek/electron-hostscan.git
# Go into the repository
cd electron-hostscan
# Install dependencies
npm install
# Install electronjs globally
npm install electron -g
# Run the app
electron .
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.
