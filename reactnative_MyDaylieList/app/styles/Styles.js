import {StyleSheet} from 'react-native';
import Colors from './Colors.js';
import Constants from 'expo-constants';
import Themes from '../themes/Themes.js';
import {FontAwesome5, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import * as React from "react";
import ScreensHelper from "../screens/ScreensHelper";

export const NavigationTheme = {
    dark: false,
    colors: {
        primary: Colors(Themes.current).contrast.normal,
        background: Colors(Themes.current).primary.normal,
        card: Colors(Themes.current).primary.light,
        text: Colors(Themes.current).contrast.normal,
        border: Colors(Themes.current).primary.dark,
        notification: Colors(Themes.current).alert.dark,
    },
};

export const Styles = StyleSheet.create({
    flex1: {
        flex: 1,
    },
    flexVHCenter: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nav: {
        backgroundColor: Colors(Themes.current).primary.dark,
    },
    content: {
        flex: 1,
    },
    main: {
        flex: 0.9,
    },
    container: {
        flex: 1,
        backgroundColor: Colors(Themes.current).primary.normal,
        paddingTop: Constants.statusBarHeight,
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    tabsContainer: {
        flex: 0.1,
    },
    text: {
        color: Colors(Themes.current).contrast.normal,
        fontSize: 16,
    },
    textReverse: {
        color: Colors(Themes.current).primary.normal,
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    card: {
        backgroundColor: Colors(Themes.current).primary.light,
        flex: 1,
        paddingTop: 12,
        paddingBottom: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bgTransparent: {backgroundColor: "transparent"},
    bgPrimaryLight: {backgroundColor: Colors(Themes.current).primary.light},
    bgPrimaryNormal: {backgroundColor: Colors(Themes.current).primary.normal},
    bgPrimaryDark: {backgroundColor: Colors(Themes.current).primary.dark},
    bgSecondaryLight: {backgroundColor: Colors(Themes.current).secondary.light},
    bgSecondaryNormal: {backgroundColor: Colors(Themes.current).secondary.normal},
    bgSecondaryDark: {backgroundColor: Colors(Themes.current).secondary.dark},
    bgContrastLight: {backgroundColor: Colors(Themes.current).contrast.light},
    bgContrastNormal: {backgroundColor: Colors(Themes.current).contrast.normal},
    bgContrastDark: {backgroundColor: Colors(Themes.current).contrast.dark},
    bgGrayLight: {backgroundColor: Colors(Themes.current).gray.light},
    bgGrayNormal: {backgroundColor: Colors(Themes.current).gray.normal},
    bgGrayDark: {backgroundColor: Colors(Themes.current).gray.dark},
    bgAlertLight: {backgroundColor: Colors(Themes.current).alert.light},
    bgAlertNormal: {backgroundColor: Colors(Themes.current).alert.normal},
    bgAlertDark: {backgroundColor: Colors(Themes.current).alert.dark},
    bgFailLight: {backgroundColor: Colors(Themes.current).fail.light},
    bgFailNormal: {backgroundColor: Colors(Themes.current).fail.normal},
    bgFailDark: {backgroundColor: Colors(Themes.current).fail.dark},

    colorPrimaryLight: {color: Colors(Themes.current).primary.light},
    colorPrimaryNormal: {color: Colors(Themes.current).primary.normal},
    colorPrimaryDark: {color: Colors(Themes.current).primary.dark},
    colorSecondaryLight: {color: Colors(Themes.current).secondary.light},
    colorSecondaryNormal: {color: Colors(Themes.current).secondary.normal},
    colorSecondaryDark: {color: Colors(Themes.current).secondary.dark},
    colorContrastLight: {color: Colors(Themes.current).contrast.light},
    colorContrastNormal: {color: Colors(Themes.current).contrast.normal},
    colorContrastDark: {color: Colors(Themes.current).contrast.dark},
    colorGrayLight: {color: Colors(Themes.current).gray.light},
    colorGrayNormal: {color: Colors(Themes.current).gray.normal},
    colorGrayDark: {color: Colors(Themes.current).gray.dark},
    colorAlertLight: {color: Colors(Themes.current).alert.light},
    colorAlertNormal: {color: Colors(Themes.current).alert.normal},
    colorAlertDark: {color: Colors(Themes.current).alert.dark},
    colorFailLight: {color: Colors(Themes.current).fail.light},
    colorFailNormal: {color: Colors(Themes.current).fail.normal},
    colorFailDark: {color: Colors(Themes.current).fail.dark},
});

const colorHeader = (active) => {
    let retorno = active ? Colors(Themes.current).contrast.dark : Colors(Themes.current).secondary.dark;
    return retorno;
}
const colorFooter = active =>
    active ? Colors(Themes.current).contrast.normal : Colors(Themes.current).secondary.normal;


export const Icons = {
    home:    (active) => (<MaterialCommunityIcons color={colorHeader(active)} size={36} name="home-edit-outline"  />),
    list1:   (active) => (<FontAwesome5           color={colorHeader(active)} size={36} name="clipboard-list"     />),
    list2:   (active) => (<FontAwesome5           color={colorHeader(active)} size={36} name="clipboard-list"     />),
    todo:    (active) => (<MaterialCommunityIcons color={colorFooter(active)} size={36} name="playlist-edit"      />),
    done:    (active) => (<MaterialCommunityIcons color={colorFooter(active)} size={36} name="playlist-check"     />),
    config:  (active) => (<MaterialIcons          color={colorFooter(active)} size={24} name="settings"           />),
    btnDone: (active) => (<MaterialIcons          color={colorFooter(active)} size={36} name="cloud-done"         />),
    btnCfg:  (active) => (<MaterialIcons          color={colorFooter(active)} size={36} name="app-settings-alt"   />),
    btnRedo: (active) => (<MaterialCommunityIcons color={colorFooter(active)} size={36} name="reload"             />),
    btnDel:  (active) => (<MaterialIcons          color={colorFooter(active)} size={36} name="delete-forever"     />),
    rightAction: (tab) => {
        if(tab.name == ScreensHelper.tabs.Todos.name)
            return Icons.btnCfg(true);
        else if(tab.name == ScreensHelper.tabs.Done.name)
            return Icons.btnDel(true)
    },
    leftAction:  (tab) => {
        if(tab.name == ScreensHelper.tabs.Todos.name)
            return Icons.btnDone(false);
        else if(tab.name == ScreensHelper.tabs.Done.name)
            return Icons.btnRedo(false)
    },

}