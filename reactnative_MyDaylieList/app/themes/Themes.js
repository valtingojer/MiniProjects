const Themes = 
{
    all: { Cream: "Cream", Cool: "Cool", Dark: "Dark", DarkKitty: "DarkKitty",
        Happy: "Happy", Kitty: "Kitty", Light: "Light", Momo: "Momo",
        Zeric: "Zeric", },
    default: "Light",
    current: "Zeric",
    filter: (theme) => { return (theme && Object.values(Themes.all).includes(theme)) ? theme : Themes.current; },
    change: (theme) => { Themes.current = Themes.filter(theme); },
    get: (theme) => { return Themes.all[theme] || Themes.default },
}
export default Themes;



