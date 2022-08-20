import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    StyleSheet, Image, Text, View, ScrollView, ActivityIndicator,
    FlatList, Dimensions, Animated, TouchableWithoutFeedback,
    TouchableOpacity, Share, Picker, Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import LoadWallpapersAsync from './app/WebData';
import * as Tasks from './app/Tasks';
import * as Storage from './app/Storage';

import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';

import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";


const { height, width } = Dimensions.get("window");



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isRunning: false,
            scale: new Animated.Value(1),
            t: 0,
            reloadInterval: "",
            refreshButtonOpacity: 1,
        };


        this.scale = { transform: [{ scale: this.state.scale }], };
        this.actionBarY = this.state.scale.interpolate({
            inputRange: [0.9, 1], outputRange: [0, -80]
        });
        this.configBarY = this.state.scale.interpolate({
            inputRange: [0.9, 1], outputRange: [0, -100]
        });
        this.borderRadius = this.state.scale.interpolate({
            inputRange: [0.9, 1], outputRange: [30, 0]
        });

    }

    loadWallpapers = async (force) => {
        let interval = await Storage.intervalMilliseconds();
        let now = new Date() - 0;
        let timeExpend = now - this.state.t;

        let delayOK = timeExpend < interval;
        let notForced = force !== true;
        let notFirstRun = this.state.t > 0;

        let tryAgain = delayOK && notForced && notFirstRun;

        if (tryAgain) {
            console.log("wait")
            clearTimeout(this.state.reloadInterval);
            this.state.reloadInterval = setTimeout(this.loadWallpapers, (interval - timeExpend));
        } else {
            this.setState({ t: now });

            let gotError = true
            let wallpaperData = "";
            clearTimeout(this.state.reloadInterval);


            try {
                let dt = await Storage.GetWallpaperData();
                
                wallpaperData = await LoadWallpapersAsync(dt);

                gotError = wallpaperData.error;

                if (!Array.isArray(wallpaperData.images))
                    wallpaperData.images = [];

                if (gotError === true)
                    throw wallpaperData.message;

                let sts = {
                    url: wallpaperData.url,
                    urlTag: wallpaperData.urlTag,
                    htmlString: wallpaperData.htmlString,
                    images: wallpaperData.images
                };
                this.setState({ ...sts, isLoading: false });
                await Storage.SetState(sts);

            } catch (e) {
                console.log("error loadingWallpaper : app.js loadWallpapers :: ", e)
                showMessage({
                    message: e,
                    description: `Trying again in ${this.state.config.interval} minuts`,
                    type: "error",
                });
                gotError = true;
            }


            if (wallpaperData.images.length > 0 && this.state.config.autoRun == "true") {
                this._setWallpaper(wallpaperData.images[0].src);
            }


            if (this.state.config.autoRun == "true" || gotError === true) {
                this.state.reloadInterval = setTimeout(this.loadWallpapers, interval);
            }

        }
    }

    userReload = () => {
        if (this.state.refreshButtonOpacity === 1) {
            this.setState({ refreshButtonOpacity: 0.3 });
            setTimeout(() => {
                this.setState({
                    refreshButtonOpacity: 1
                });
                showMessage({
                    message: "Aweee!",
                    description: `Reload is ready`,
                    type: "info",
                });
            }, 10000);
            this.loadWallpapers(true);
        } else {
            showMessage({
                message: "Not ready yet!",
                description: `You can manually reaload every 10 seconds, Enjoy your 20 pics by swiping left/right =)`,
                type: "error",
            });
        }
    } 
    userSetWallpaper = async (src) => {
        showMessage({
            message: "...",
            description: "Trying to give you a beautiful wallpaper",
            type: "info",
        });
        this._setWallpaper(src);
    };
    userShareWallpaper = async (src) => {
        try {
            let msg = await Storage.GetRandomMessage(src)
            await Share.share({ message: msg });
        } catch (e) {
            console.log("Error user action userShareWallpaper", e)
            console.log(e);
        }
    };

    changeSettings = async (setting, value) => {
        if (setting == "autoRun") 
            await Tasks.HandleRefreshWallpaperRegistration(value);
        

        if (setting == "interval")
            await Tasks.RestartRefreshWallpaperRegistration

        this.setState((state) => ({
            config: {
                ...state.config,
                [setting]: value,
            }
        }), async () => {
            await Storage.SetConfig({ ...this.state.config })
            await this.loadWallpapers(true);
        });

    }
    showControls = async (item) => {
        let sts = await Storage.GetState();
        let focus = !sts.isImageFocused;
        await Storage.SetState({ isImageFocused: focus });

        this.setState((state) => ({
            isImageFocused: focus
        }), () => {
            if (focus) {
                Animated
                    .spring(this.state.scale, { toValue: 0.9, useNativeDriver: false })
                    .start();
            } else {
                Animated
                    .spring(this.state.scale, { toValue: 1, useNativeDriver: false })
                    .start();
            }
        });
    };

    _setWallpaper = (uri) => {
        try {
            ManageWallpaper.setWallpaper({ uri: uri, },
                () => showMessage({
                    message: "=D", description: "Your wallpaper is AWESOME !", type: "success",
                }), TYPE.HOME);
        } catch (e) {
            console.log("error App.js -> setWallpaper::", e)
            showMessage({
                message: "=*{", description: "Something is wrong, I could not change your wallpaper", type: "error",
            });
            console.log(e)
        }

    };
    _startTheApp = async () => {
        if (this.state.isRunning === false) {
            let savedState = await Storage.GetSingleStateData();
            this.setState({ ...savedState });
            await Tasks.HandleRefreshWallpaperRegistration(savedState.config.autoRun);
        }
        
        if (!this.state.images || this.state.images.length === 0) {
            await this.loadWallpapers(true);
        } else {
            this.setState({ isLoading: false });
            let interval = await Storage.intervalMilliseconds();
            this.state.reloadInterval = setTimeout(this.loadWallpapers, interval);
        }
        this.setState({
            refreshButtonOpacity: 1
        });
    }
    componentDidMount() {
        this._startTheApp();
    }










    renderItem = (img) => {
        return (
            <View>
                <TouchableWithoutFeedback onPress={(item) => this.showControls(item)}>
                    <Animated.View style={[{ height, width }, this.scale]}>
                        <Animated.Image source={{ uri: img.src }}
                            style={{ flex: 1, height: null, width: null, resizeMode: 'contain', borderRadius: 30 }}
                        />
                    </Animated.View>
                </TouchableWithoutFeedback>
                <Animated.View style={[{
                    borderWidth: 1, borderColor: "#131019", borderTopEndRadius: 20, borderTopStartRadius: 20, borderBottomColor: "#09080D",
                    position: "absolute", left: 0, right: 0, bottom: this.actionBarY, height: 80, backgroundColor: "#131019"
                }]}>
                    <View style={[{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-around" }]}>
                        <TouchableOpacity activeOpacity={0.3} onPress={() => this.userReload()} style={[{ opacity: 1 }]}>
                            <Ionicons name="ios-refresh" color="#577430" size={40} />
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.3} onPress={() => this.userSetWallpaper(img.src)} style={[{ opacity: 1 }]}>
                            <Ionicons name="ios-save" color="#577430" size={40} />
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.3} onPress={() => this.userShareWallpaper(img.href)} style={[{ opacity: 1 }]}>
                            <Ionicons name="ios-share" color="#577430" size={40} />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        )
    }
    render() {
        return this.state.isLoading

            ?

            (
                <View style={[{ flex: 1, backgroundColor: '#09080D', alignItems: 'center', justifyContent: 'center' }]} >
                    <ActivityIndicator size="large" color="gray" />
                    <FlashMessage position="top" />
                </View>
            )

            :

            (

                <View style={[{ flex: 1, backgroundColor: '#09080D', alignItems: 'center', justifyContent: 'center' }]} >
                    <View style={[{ flex: 1, position: "absolute", top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }]} >
                        <ActivityIndicator size="large" color="gray" />
                    </View>
                    <FlatList
                        scrollEnabled={!this.state.isImageFocused}
                        horizontal
                        pagingEnabled
                        data={this.state.images}
                        renderItem={({ item }) => this.renderItem(item)}
                        //keyExtractor={({ item }) => item.src}
                    />
                    <TouchableOpacity activeOpacity={0} onPress={() => this.showControls()}
                        style={[{
                            borderWidth: 1, borderColor: "#131019", borderTopColor: "#09080D",
                            position: "absolute", left: 0, right: 0, top: 0, height: 60, backgroundColor: "#131019",
                            justifyContent: "flex-end", alignItems: "center", pointerEvents: "none"
                        }]}
                    >
                        <Ionicons name="ios-add" color="#577430" size={40} />
                    </TouchableOpacity>


                    <Animated.View style={[{
                        borderWidth: 1, borderColor: "#131019", borderBottomEndRadius: 20, borderBottomStartRadius: 20, borderBottomColor: "#09080D",
                        position: "absolute", left: 0, right: 0, top: this.configBarY, height: 100, backgroundColor: "#131019", paddingTop: 20
                    }]}>
                        <View style={[{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-around" }]}>
                            <Picker
                                selectedValue={this.state.config.priority.toString()}
                                style={{ height: 50, width: 160, color: "#706E73" }}
                                onValueChange={(itemValue, itemIndex) => this.changeSettings("priority", itemValue)}
                            >
                                {this.state.configOptions.priority.map((item) => (<Picker.Item key={"priority_" + item.value} label={item.key} value={item.value} />))}
                            </Picker>

                            <Picker
                                selectedValue={parseInt(this.state.config.interval)}
                                style={{ height: 50, width: 160, color: "#706E73" }}
                                onValueChange={(itemValue, itemIndex) => this.changeSettings("interval", itemValue)}
                            >
                                {this.state.configOptions.interval.map((item) => (<Picker.Item key={"interval_" + item.value} label={item.key} value={item.value} />))}
                            </Picker>

                        </View>
                        <View style={[{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-around" }]}>
                            {/*
                            <Picker
                                selectedValue={this.state.config.resize.toString()}
                                style={{ height: 50, width: 160, color: "#706E73" }}
                                onValueChange={(itemValue, itemIndex) => this.changeSettings("resize", itemValue)}
                            >
                                {this.state.configOptions.resize.map((item) => (<Picker.Item key={"onlyWifi_" + item.value} label={item.key} value={item.value} />))}
                            </Picker>
                             */}

                            <Picker
                                selectedValue={this.state.config.autoRun.toString()}
                                style={{ height: 50, width: 160, color: "#706E73" }}
                                onValueChange={(itemValue, itemIndex) => this.changeSettings("autoRun", itemValue)}
                            >
                                {this.state.configOptions.autoRun.map((item) => (<Picker.Item key={"autoRun_" + item.value} label={item.key} value={item.value} />))}
                            </Picker>

                            <Picker
                                selectedValue={this.state.config.onlyWifi.toString()}
                                style={{ height: 50, width: 160, color: "#706E73" }}
                                onValueChange={(itemValue, itemIndex) => this.changeSettings("onlyWifi", itemValue)}
                            >
                                {this.state.configOptions.onlyWifi.map((item) => (<Picker.Item key={"onlyWifi_" + item.value} label={item.key} value={item.value} />))}
                            </Picker>


                        </View>
                    </Animated.View>


                    <FlashMessage position="top" />
                </View>
            )

            ;
    }
}
export default App;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
