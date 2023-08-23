import { NeolineSignleton } from "./NeolineSingleton";

export function initDapi(setIsLoading, setMessage) {
    const initCommonDapi = new Promise((resolve, reject) => {
        window.addEventListener('NEOLine.NEO.EVENT.READY', () => {
            NeolineSignleton.neoline = new window.NEOLine.Init();
            if (NeolineSignleton.neoline) {
                resolve(NeolineSignleton.neoline);
            } else {
                reject('common dAPI method failed to load.');
            }
        });
    });
    const initN3Dapi = new Promise((resolve, reject) => {
        window.addEventListener('NEOLine.N3.EVENT.READY', () => {
            NeolineSignleton.neolineN3 = new window.NEOLineN3.Init();
            if (NeolineSignleton.neolineN3) {
                resolve(NeolineSignleton.neolineN3);
            } else {
                reject('N3 dAPI method failed to load.');
            }
        });
    });
    initCommonDapi.then(() => {
        console.log('The common dAPI method is loaded.');
        return initN3Dapi;
    }).then(() => {
        console.log('The N3 dAPI method is loaded.');
        setIsLoading(false);
        setMessage('');
    }).catch((err) => {
        console.log(err);
    })

    setTimeout(() => {
        if(NeolineSignleton.neoline === undefined) {
            setMessage('만약 Neoline이 설치되어 있지 않다면 https://chrome.google.com/webstore/detail/neoline/cphhlgmgameodnhkjdmkpanlelnlohao에서 Neoline을 설치해주세요')
        }
    }, 3000)
};