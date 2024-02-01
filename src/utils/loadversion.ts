const loadVersion = async () => {
    const appVersion = await window.api.getAppVersion();
    const envVersions = window.api.envVersion;

    return {
        ...envVersions,
        app: appVersion
    };
}

export default loadVersion;