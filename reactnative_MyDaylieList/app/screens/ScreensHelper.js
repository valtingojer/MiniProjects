import * as React from "react";
import { Icons } from "../styles/Styles";

const compareScreen = (screen, compare) => {
    return screen === compare;
}

const screens = {
    TodoListMain: { name: "TodoListMain", index: 0, icon: screen => Icons.home(compareScreen(screen, 0)) },
    TodoListSec:  { name: "TodoListSec" , index: 1, icon: screen => Icons.list1(compareScreen(screen, 1)) },
    TodoListAlt:  { name: "TodoListAlt" , index: 2, icon: screen => Icons.list2(compareScreen(screen, 2)) },
};

const compareTab = (tab, compare) => {
    if(tab && tab.name && compare)
        return tab.name.toString().toLowerCase() === compare.toString().toLowerCase();
    return false;
}

const tabs = {
    Todos:  { name: 'todos' , icon: (tab) => Icons.todo(compareTab(tab, 'todos')) },
    Done:   { name: 'done'  , icon: (tab) => Icons.done(compareTab(tab, 'done')) },
    Config: { name: 'config', icon: (tab) => Icons.config(compareTab(tab, 'config')) },
};

const ScreensHelper = {
    screens: screens,
    tabs: tabs,
};

export default ScreensHelper;