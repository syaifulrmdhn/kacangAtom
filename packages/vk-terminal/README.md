# VK Terminal

 __     ___  __  _____                   _             _
 \ \   / / |/ / |_   _|__ _ __ _ __ ___ (_)_ __   __ _| |
  \ \ / /| ' /    | |/ _ \ '__| '_ ` _ \| | '_ \ / _` | |
   \ V / | . \    | |  __/ |  | | | | | | | | | | (_| | |
    \_/  |_|\_\   |_|\___|_|  |_| |_| |_|_|_| |_|\__,_|_|


A terminal package for Atom, complete with themes, API and more for [PlatformIO IDE](http://platformio.org/#!/vk).

![demo](https://github.com/jeremyramin/terminal-plus/raw/master/resources/demo.gif)

*[Nucleus Dark UI](https://atom.io/themes/nucleus-dark-ui) with [Atom Material Syntax](https://atom.io/themes/atom-material-syntax) and our Homebrew theme.*

## Install
Ready to install?

You can install via apm: `apm install vk-terminal`

Or navigate to the install tab in Atom’s settings view, and search for `vk-terminal`.

## Usage

`vk-terminal` stays in the bottom of your editor while you work.

Click on a status icon to toggle that terminal (or ``ctrl-` ``). Right click the status icon for a list of available commands. From the right-click menu you can color code the status icon as well as hide or close the terminal instance.

### Terminal
You can open the last active terminal with the `vk-terminal:toggle` command (Default:`` ctrl-` ``).  If no terminal instances are available, then a new one will be created. The same toggle command is used to hide the currently active terminal.

From there you can begin typing into the terminal. By default the terminal will change directory into the project folder if possible. The default working directory can be changed in the settings to the home directory or to the active file directory.

[See available commands below](#commands).

## Features

### Full Terminal
Every terminal is loaded with your system’s default initialization files. This ensures that you have access to the same commands and aliases as you would in your standard terminal.

### Themes
The terminal is preloaded with several themes that you can choose from. Not satisfied?  
Use the following template in your stylesheet:
```css
.vk-terminal .xterm {
  background-color: ;
  color: ;

  ::selection {
    background-color: ;
  }

  .terminal-cursor {
    background-color: ;
  }
}
```

### Process Titles
By hovering over the terminal status icon, you can see which command process is currently running in the terminal.

![](https://github.com/jeremyramin/terminal-plus/raw/master/resources/terminal_title.png)

### Terminal Naming
Need a faster way to figure out which terminal is which? Name your status icons!

![](https://github.com/jeremyramin/terminal-plus/raw/master/resources/status-icon_rename.png)

Available via the status icon context menu.

![](https://github.com/jeremyramin/terminal-plus/raw/master/resources/status-icon_rename-dialog.png)

### Color Coding
Color code your status icons!

![](https://github.com/jeremyramin/terminal-plus/raw/master/resources/status-icon_color_coding.png)

The colors are customizable in the settings, however the color names remain the same in the context menu.

### Sorting
Organize your open terminal instances by dragging and dropping them.

![](https://github.com/jeremyramin/terminal-plus/raw/master/resources/sorting.gif)

### Resizable
You can resize the view vertically, or just maximize it with the maximize button.

### Working Directory
You can set the default working directory for new terminals. By default this will be the project folder.

### File Dropping
Dropping a file on the terminal will insert the file path into the input. This works with external files, tabs from the Atom tab-view, and entries from the Atom tree-view.

### Insert Selected Text
Insert and run selected text from your text editor by running the `vk-terminal:insert-selected-text` command (`ctrl-enter`).

![](https://github.com/jeremyramin/terminal-plus/raw/master/resources/insert_selected_text.gif)

If you have text selected, it will insert your selected text into the active terminal and run it.  
If you don't have text selected it, will run the text on the line where your cursor is then proceed to the next line.

### Quick Command Insert
Quickly insert a command to your active terminal by executing the `vk-terminal:insert-text` command.

![](https://github.com/jeremyramin/terminal-plus/raw/master/resources/insert_text.png)

A dialog will pop up asking for the input to insert. If you have the `Run Inserted Text` option enabled in the settings (default is false), vk-terminal will automatically run the command for you.

#### Support for Special Keys
Support for IME, dead keys and other key combinations via the `Insert Text` dialog box. Just click the keyboard button in the top left of the terminal or set up a keymap to the `vk-terminal:insert-text` command.

![](https://github.com/jeremyramin/terminal-plus/raw/master/resources/special_keys.gif)

Note: Make sure you have the `Run Inserted Command` toggle off otherwise it will run your inserted text.

### Map Terminal To
Map your terminals to each file or folder you are working on for automatic terminal switching.

#### File
![](https://github.com/jeremyramin/terminal-plus/raw/master/resources/map_terminals_to_file.gif)

#### Folder
![](https://github.com/jeremyramin/terminal-plus/raw/master/resources/map_terminals_to_folder.gif)

Toggling the `Auto Open a New Terminal (For Terminal Mapping)` option will have the mapping create a new terminal automatically for files and folders that don't have a terminal. The toggle is located right under the `Map Terminals To` option.

![](https://github.com/jeremyramin/terminal-plus/raw/master/resources/map_terminals_to_auto_open.gif)

## Commands
| Command | Action | Default Keybind |
|---------|--------|:-----------------:|
| vk-terminal:new | Create a new terminal instance. | `ctrl-shift-t`<br>or<br>`cmd-shift-t` |
| vk-terminal:toggle | Toggle the last active terminal instance.<br>**Note:** This will create a new terminal if it needs to. | `` ctrl-` ``<br>(Control + Backtick) |
| vk-terminal:prev | Switch to the terminal left of the last active terminal. | `ctrl-shift-j`<br>or<br>`cmd-shift-j` |
| vk-terminal:next | Switch to the terminal right of the last active terminal. | `ctrl-shift-k`<br>or<br>`cmd-shift-k` |
| vk-terminal:insert-selected-text | Run the selected text as a command in the active terminal. | `ctrl-enter` |
| vk-terminal:insert-text | Bring up an input box for using IME and special keys. | –––––––––––– |
| vk-terminal:fullscreen | Toggle fullscreen for active terminal. | –––––––––––– |
| vk-terminal:close | Close the active terminal. | `ctrl-shift-x`<br>or<br>`cmd-shift-x` |
| vk-terminal:close-all | Close all terminals. | –––––––––––– |
| vk-terminal:rename | Rename the active terminal. | –––––––––––– |

---
A fork of [jeremyramin/terminal-plus](https://github.com/jeremyramin/terminal-plus).
