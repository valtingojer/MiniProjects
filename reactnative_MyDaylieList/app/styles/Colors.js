import Themes  from '../themes/Themes.js';

const Colors = (theme) => {
  theme = Themes.filter(theme);
  const myColors = 
  {
    Cream:      {
      primary:   { light: "#fcfcfc", normal: "#deddd3", dark: "#c0b6a9" },
      secondary: { light: "#dedbbd", normal: "#c3bd86", dark: "#ada55a" },
      contrast:  { light: "#282A36", normal: "#21222C", dark: "#191A21" },
      gray:      { light: "#eeeeee", normal: "#d9d9d9", dark: "#aeaeae" },
      alert:     { light: "#d9d772", normal: "#CBC83E", dark: "#a7a42d" },
      fail:      { light: "#8786cf", normal: "#5E54BF", dark: "#403e9d" },
    },
    Cool:       {
      primary:   { light: "#333b44", normal: "#292f36", dark: "#21262b" },
      secondary: { light: "#ffffff", normal: "#dfdae7", dark: "#b0a4c4" },
      contrast:  { light: "#c9dcdc", normal: "#96bbbb", dark: "#6da1a1" },
      gray:      { light: "#d5edc5", normal: "#a6d883", dark: "#80c74e" },
      alert:     { light: "#d4f995", normal: "#b5f44a", dark: "#9cf00f" },
      fail:      { light: "#e78b87", normal: "#db504a", dark: "#c42d27" },
    },
    Dark:       {
      primary:   { light: "#282A36", normal: "#21222C", dark: "#191A21" },
      secondary: { light: "#565263", normal: "#4b485c", dark: "#424056" },
      contrast:  { light: "#fcfcfc", normal: "#deddd3", dark: "#9b987a" },
      gray:      { light: "#fcfcfc", normal: "#888888", dark: "#333333" },
      alert:     { light: "#f9f792", normal: "#eBf85E", dark: "#c7f44d" },
      fail:      { light: "#8786cf", normal: "#5E54BF", dark: "#403e9d" },
    },
    DarkKitty:  {
      primary:   { light: "#004f41", normal: "#003f34", dark: "#00322a" },
      secondary: { light: "#03300d", normal: "#022d07", dark: "#011e02" },
      contrast:  { light: "#ffffff", normal: "#ffc0cb", dark: "#ff6781" },
      gray:      { light: "#5f5f5f", normal: "#4c4c4c", dark: "#3d3d3d" },
      alert:     { light: "#7c55ca", normal: "#4e0fd0", dark: "#411894" },
      fail:      { light: "#40f9ff", normal: "#00f7ff", dark: "#00c6cc" },
    },
    Happy:      {
      primary:   { light: "#1af9bf", normal: "#06d6a0", dark: "#05ab80" },
      secondary: { light: "#f58ea7", normal: "#ef476f", dark: "#e41445" },
      contrast:  { light: "#2f699b", normal: "#26547c", dark: "#1e4363" },
      gray:      { light: "#fcfcfc", normal: "#cacaca", dark: "#a2a2a2" },
      alert:     { light: "#ffecbf", normal: "#ffd166", dark: "#ffbc1f" },
      fail:      { light: "#0c3f00", normal: "#0a3200", dark: "#082800" },
    },
    Kitty:      {
      primary:   { light: "#ffffff", normal: "#ffc0cb", dark: "#ff6781" },
      secondary: { light: "#ffc5b3", normal: "#ff835c", dark: "#ff4e17" },
      contrast:  { light: "#004f41", normal: "#003f34", dark: "#00322a" },
      gray:      { light: "#e0e0e0", normal: "#b3b3b3", dark: "#8f8f8f" },
      alert:     { light: "#b3da65", normal: "#a1e01f", dark: "#7ba428" },
      fail:      { light: "#ff4640", normal: "#ff0800", dark: "#cc0600" },
    },
    Light:      {
      primary:   { light: "#ffffff", normal: "#edebd7", dark: "#d1cc99" },
      secondary: { light: "#eccb7b", normal: "#e3b23c", dark: "#c9961d" },
      contrast:  { light: "#524e45", normal: "#423e37", dark: "#35322c" },
      gray:      { light: "#c7bebe", normal: "#a39594", dark: "#867473" },
      alert:     { light: "#89a177", normal: "#6e975f", dark: "#58824c" },
      fail:      { light: "#f36254", normal: "#ef2917", dark: "#c41d0e" },
    },
    Momo:       {
      primary:   { light: "#09636d", normal: "#074f57", dark: "#063f46" },
      secondary: { light: "#ca61a2", normal: "#b33c86", dark: "#8f306b" },
      contrast:  { light: "#210b10", normal: "#1a090d", dark: "#15070a" },
      gray:      { light: "#c9dfd3", normal: "#94bfa7", dark: "#6aa684" },
      alert:     { light: "#f7fba7", normal: "#f0f757", dark: "#eaf417" },
      fail:      { light: "#cf5c36", normal: "#cf5c36", dark: "#a94828" },
    },
    Zeric:      {
      primary:   { light: "#f3effc", normal: "#b79ced", dark: "#8759e1" },
      secondary: { light: "#ffffff", normal: "#efd9ce", dark: "#d9a58b" },
      contrast:  { light: "#2e3c3d", normal: "#253031", dark: "#1e2627" },
      gray:      { light: "#fcfcfc", normal: "#fcedfc", dark: "#ee99ee" },
      alert:     { light: "#6266e7", normal: "#5b6bbf", dark: "#5652ac" },
      fail:      { light: "#f2551c", normal: "#cc3f0c", dark: "#ff0000" },
    },
  };
  const result = myColors[Themes.get(theme)];
  return result;
};

export default Colors;