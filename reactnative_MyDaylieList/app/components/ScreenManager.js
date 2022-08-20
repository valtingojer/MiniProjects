import * as React from 'react';
import { View, ScrollView } from 'react-native';
import Colors from '../styles/Colors.js';
import { Styles } from '../styles/Styles.js';
import TodoItem from '../components/TodoItem.js';

export const Screens = {
  menus: { 
    all:    { name: "All"   , key: "menuTabAll"   , display: "All"    },
    done:   { name: "done"  , key: "menuTabDone"  , display: "Done"   },
    config: { name: "config", key: "menuTabConfig", display: "Config" },
  },
  Lists: {
    "0": { name: "0", key: "ListTab0", display: "Morning"   },
    "1": { name: "1", key: "ListTab1", display: "Afternoon" },
    "2": { name: "2", key: "ListTab2", display: "Night"     },
  }
};
export let CurrentScrren = Screens.Lists["1"];
let localizedRenderApp = null;
export const SetCurrentScreen = (screen) => { 
  CurrentScrren = screen;
  if(localizedRenderApp) localizedRenderApp();
}



export const RenderScreen = (screen, content, rendererApp) => {
  screen = (screen && Object.values(Screens).includes(screen)) ? screen : CurrentScrren;
  localizedRenderApp = rendererApp;
  let render = null;
  switch (screen.key) {
    case Screens.Lists["0"].key:
    case Screens.Lists["1"].key:
    case Screens.Lists["2"].key:
      render = (
      <View style={[Styles.content, Styles.main]}>
          <ScrollView style={Styles.content}>
            {content.map( todo => <TodoItem {...todo} /> )}
          </ScrollView>
      </View>
      );
      break;
    case Screens.menus.all.key:
      render = null;
      break;
    case Screens.menus.done.key:
      render = null;
      break;
    case Screens.menus.config.key:
      render = null;
      break;
    default:
      render = null;
      break;
  }

  return render;
};