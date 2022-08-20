import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import LoadWallpapersAsync from './WebData';
import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';
import * as Storage from './Storage';

const tasks = {
    refreshWallpaper: "refreshWallpaperTask",
};


TaskManager.defineTask(tasks.refreshWallpaper, () => {
    let result = null;
    try {
        result = BackgroundFetch.Result.NoData
        const changeWallpaper = async () => {
            try {
                let dt = await Storage.GetWallpaperData();
                let wallpaperData = await LoadWallpapersAsync(dt);
                let image = wallpaperData.images[0].src;
                ManageWallpaper.setWallpaper({ uri: image, }, null, TYPE.HOME);
                Storage.SetState({ images: wallpaperData.images });
                result = BackgroundFetch.Result.NewData;
            } catch (e) {
                console.log("task error::::TaskManager.defineTask -> const changeWallpaper::::",e)
            }
        };
        changeWallpaper();
        
    } catch (error) {
        console.log("error defining task : TaskManager.defineTask :: ", error)
        result = BackgroundFetch.Result.Failed;
    }
    return result;
});

export const RegisterRefreshWallpaper = async (taskName, intervalInSeconds) => {
    return await BackgroundFetch.registerTaskAsync(taskName, {
        minimumInterval: intervalInSeconds,
        stopOnTerminate: false,
        startOnBoot: true,
    });
}

export const UnregisterRefreshWallpaper = async (taskName) => {
    return await BackgroundFetch.unregisterTaskAsync(taskName);
}

export const HandleRefreshWallpaperRegistration = async (status) => {
    const taskName = tasks.refreshWallpaper;
    let interval = await Storage.intervalSeconds();
    let result = ""
    status = !(status === "false");
    try {
        if (status)
            result = await RegisterRefreshWallpaper(taskName, interval)
        else
            result = await UnregisterRefreshWallpaper(taskName)
    } catch (e) {
        console.log("erro na task handleTask", e)
    }
    
    return result;
}

export const RestartRefreshWallpaperRegistration = async (status) => {
    let result = false;
    try {
        await HandleRefreshWallpaperRegistration(false);
        await HandleRefreshWallpaperRegistration(true);
        result = true;
    } catch (e) {
        console.log("erro restart task RestartRefreshWallpaperRegistration", e);
    }

    return result;
}
