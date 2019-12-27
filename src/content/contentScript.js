const MOCK_DATA_KEY = "mockData";
const SETTING_KEY = "mockSetting";
const SW = {
    ON: true,
    OFF: false
};

const DEFAULT_SETTING = {
    enable: SW.OFF,
    individual: SW.OFF
};

const scriptElements = {};
const initMockData = [
    {
        name: "Verify SAID ver 1",
        url: "/siteverify",
        method: "POST",
        activated: "case1",
        num_cases: 2,
        enabled: true,
        cases: {
            case0: {
                value:
                    '{"errorCode":"SITEVERIFY","errorMessage":"Something went wrong"}',
                status: 400
            },
            case1: {
                value:
                    '{"success":true,"challenge_ts":"2019-01-29T02:25:28Z","hostname":"sitwo.testtymedigital.com","token":{"access_token":"4b5d9521-bb1d-3194-8917-06f77509beaa","scope":"am_application_scope device_not_authorized","token_type":"Bearer","expires_in":3560},"origination":{"sessionId":95903,"appCode":"1251c146d2"}}',
                status: 200
            }
        }
    },
    {
        name: "Verify SAID ver 2",
        url: "said-verify",
        method: "POST",
        activated: "case1",
        num_cases: 2,
        enabled: true,
        cases: {
            case0: {
                value:
                    '{"errorCode":"SITEVERIFY","errorMessage":"Something went wrong"}',
                status: 400
            },
            case1: {
                value:
                    '{"success":true,"challenge_ts":"2019-01-29T02:25:28Z","hostname":"sitwo.testtymedigital.com","token":{"access_token":"4b5d9521-bb1d-3194-8917-06f77509beaa","scope":"am_application_scope device_not_authorized","token_type":"Bearer","expires_in":3560},"origination":{"sessionId":95903,"appCode":"1251c146d2"}}',
                status: 200
            }
        }
    },
    {
        name: "Capture TnC",
        url: "capture-tnc",
        method: "POST",
        activated: "case1",
        num_cases: 2,
        cases: {
            case0: {
                value: '{"errorCode":"0400001","errorMessage":"Error"}',
                status: 401
            },
            case1: {
                value: "{}",
                status: 204
            }
        }
    },
    {
        name: "Verify phone number",
        url: "verify-and-capture",
        method: "POST",
        activated: "case1",
        num_cases: 2,
        cases: {
            case0: {
                value:
                    '{"errorCode":"0407010","errorMessage":"Request is not allowed, step up required"}',
                status: 403
            },
            case1: {
                value: "",
                status: 204
            }
        }
    },
    {
        name: "Verify OTP",
        url: "/otp",
        method: "POST",
        activated: "case1",
        num_cases: 2,
        cases: {
            case0: {
                value: '{"errorCode":"0407001"}',
                status: 403
            },
            case1: {
                value: '{"deliverTo":"0738504734"}',
                status: 201
            }
        }
    },
    {
        name: "Request Token",
        url: "request-token",
        method: "POST",
        activated: "case1",
        num_cases: 2,
        cases: {
            case0: {
                value: '{"stepUpToken":"123abcd", "errorCode": "0400001" }',
                status: 400
            },
            case1: {
                value:
                    '{"stepUpToken":"4f8efdf6521316812ef43087dae8e9796e054810d665181a1fc785afb07b946dafe37a243137c7f7579636eab7fb97e557f6d89d238c625df80dfd8d56c74869bd7de9b6b034dbe8c49430e9ceaec87dc267c0e643dd512c1672076ceb077fc8a1f5d8267f474f6e88b5d7a0ec5be4290def752743b0cac420481acda9e450ddfca690ec469046902fd4cf31d13fb9448b1dd0f59922640f4f87c16742427d8c82d31fff75aa76bc4398b9ad65400263fb5635f7be63b10d7083c72f24180e49d012f91bad1b202f42130cd2c3daf4f096e81606850d367d8ce1eb72040863282b1dea0646e813b29161ae670c6e86082d8e4202bec110363291e9eac91240ed0589bdf3db68ffd5c454fc3e3d30731fa8a263689e89a966efa6e99fe9dbaf1479a2f505f94a70321a741e14f9fe9564d9ddfb6e994f2e7129421902c04f48a6d72cd0f492c5aa0ce5c808c7d2874be7cb22b5008f24c11efc59c523874ce759f9c9f3fbb8441d61cd92a97d6441df210811fbaf779f25af0cf1300fd13b9102d15480654d3d1c75036f606b91a96d661310930c97859a557fcbb391151410b1e6bb4488cd18078cb857080d91ca4318bec7480427766dd1fe3584a1c79b6b4640280b06cf4662158214e6bf4b1820cc44550b255d8fc32e83fdc6e66e4a222658aacf6cc284c0258b247ef46abeea8948cc5d57bfa97a99c987acad6460c17d28628d2f32a1370d7681afdaf5fc8fba192865f1f4edb053511955f8726fe28842c4f3402087430a0d3e0cc01a277cfae36849185bc47a62a663d9767474e5be1e039ab0ffb4cf090fcdb436e3f611092cc679a2c67ee02326f4901c02358906cd3a029c553d7f1827068f583d0bc63b5042351177ed7a4a6ad9ef1800d915c058344e9fe89f3be16749c108cef5fb258dd502db228a6d321424de826952869a64fd7bc9f51a147f8fdaf84ae34729ca863cc47405a1df47a8c350aa8b4326062bdb66553ea0054b97191729b493e36f5bd710aeb3ee9af7741f70374748c7f2bbbc0b3a65e14a362bf15985248fedc41b7b03ae9ec7dd15933800b1873a046e3219346aa869a4dbd234419a422e80d9c904fb3e50b647175cbbec6439676819e8d808f04c91bd7d30ebd35238c0a667f7ef976b2ee18eee47d1a40fada7a2de61172c73b8b6f57cbb1f188ab3d1cb8a80b2b124cd20d3c174035632e678b82e72f51826c6a86721ec3a2791aa530f41d78a12e6feca09fd9e07f2e8bb3c3bfdb59f4204fb7a5f47aa33d3c9c9d347dd03c2877fac8ebaa378ff06aedbb8b77c26e59e8f9e674abe18156adef7c04f745f6f270e529ca02bf6148da676b98501a65f3f9037bdcccbf72a7be8e378d80dc207c5248ce95a47318c8666f973f03492d503056bd11c8d8c818af4ab904bbfeb83ac3f462d901312a72a8e4ef70dc50a4cabf530bd38f89c9ca45694d5f30edfba16fe9608b3d453e5df17aeda8bfad283dd83c9012686550a68b902e5c75a4f67e452bd6188046ebbda0b64c60e6d1447653cea162d056f10e8e936a842a608d69d7250d08d37e945317cc794f3b897280f5072968861efd84aa1ba48f184a4307eed3eaa22c37f51e08f111bfb2bce261f722c189a67b133a9ad419d942db089bd57d3c56eb0c259990fb88f4d79136087e8e4a315bcf3e2f472efbe33170c1f3c96ae4ff805143c6bd551056f5bfa5d7446f9c46d39b163b9f01f16d71d987b26dee3aebd14b3f3c7eee2c3074231d9a56d518c7e5e57aa205e34a5e75259cfc4efcdaac4e082ff7f571105cf4a"}',
                status: 200
            }
        }
    },
    {
        name: "Verification",
        url: "get-verification-result",
        method: "GET",
        activated: "case1",
        num_cases: 2,
        cases: {
            case0: {
                value:
                    '{"details":{"profileStatus":"Active","lastName":"JONES","accounts":[{"accountNumber":"50000038913","accountStatus":"Active","accountType":"REGULAR_SAVINGS"},{"accountNumber":"51000035090","accountStatus":"Active","accountType":"CURRENT_ACCOUNT"}],"profileId":null,"addressVerified":false,"firstName":"AHMED","hanisImg":true},"decisionCode":"0407002"}',
                status: 202
            },
            case1: {
                value:
                    '{"details":{"profileStatus":"Active","lastName":"JONES","accounts":[{"accountNumber":"50000038913","accountStatus":"Active","accountType":"REGULAR_SAVINGS"},{"accountNumber":"51000035090","accountStatus":"Active","accountType":"CURRENT_ACCOUNT"}],"profileId":"8a9286326893920d01689cd836ac08bd","addressVerified":false,"firstName":"AHMED","hanisImg":true},"decisionCode":"0409010"}',
                status: 200
            }
        }
    },
    {
        name: "Get MCQ",
        url: "get-questions",
        method: "POST",
        activated: "case1",
        num_cases: 2,
        cases: {
            case0: {
                value:
                    '{"errorCode": {"status": 404, "statusText": "Error text."}}',
                status: 403
            },
            case1: {
                value:
                    '{"creditMcqs":[{"answers":[{"answer":"Virgin Mobile","id":7888241},{"answer":"Cell C","id":7888242},{"answer":"Vodacom","id":7888243},{"answer":"Autopage","id":7888244},{"answer":"None of these","id":7888245}],"question":"With which company do you have a cell phone contract?","requiredNoOfAnswers":1,"id":21016},{"answers":[{"answer":"None of these","id":7888238},{"answer":"011 DAINFERN","id":7888235},{"answer":"007 SECURITY SERVICES","id":7888234},{"answer":"011 AUTO","id":7888236},{"answer":"FIRST NATIONAL BANK","id":7888237}],"question":"Who is your previous or current employer?","requiredNoOfAnswers":1,"id":27003},{"answers":[{"answer":"Kulula Credit Card ","id":7888230},{"answer":"Absa Credit Card","id":7888231},{"answer":"Standard Bank Credit Card","id":7888229},{"answer":"None of these","id":7888233},{"answer":"Standard Bank Diners","id":7888232}],"question":"Name your credit card accounts","requiredNoOfAnswers":1,"id":21003},{"answers":[{"answer":"Yes","id":7888227},{"answer":"No","id":7888228}],"question":"Do you have a Mr Price Weekend account?","requiredNoOfAnswers":1,"id":21009},{"answers":[{"answer":"No","id":7888240},{"answer":"Yes","id":7888239}],"question":"Do you or did you finance your vehicle with IEMAS Card?","requiredNoOfAnswers":1,"id":28095}],"nameMcqs":[{"id":1,"name":"Hameed Mohammed"},{"id":2,"name":"Mensur Jones"},{"id":3,"name":"Resit Jusic"},{"id":4,"name":"Izz Ud-Din Sadik"},{"id":5,"name":"Ahmed Jones"},{"id":6,"name":"Asif Sadik"},{"id":7,"name":"Çetin Mohammed"},{"id":8,"name":"Ilhan Jusic"}]}',
                status: 200
            }
        }
    },
    {
        name: "Capture MCQ",
        url: "capture-identity-mcq",
        method: "POST",
        activated: "case1",
        num_cases: 2,
        cases: {
            case0: {
                value:
                    '{"errorCode": {"status": 404, "statusText": "Error text."}}',
                status: 404
            },
            case1: {
                value: '{"status":"Accepted"}',
                status: 200
            }
        }
    },
    {
        name: "Capture SoF",
        url: "capture-sources-of-funds",
        method: "POST",
        activated: "case1",
        num_cases: 2,
        cases: {
            case0: {
                value: '{"errorCode":"0400002"}',
                status: 404
            },
            case1: {
                value: "{}",
                status: 204
            }
        }
    },
    {
        name: "Capture CRS answer",
        url: "capture-crs-answer",
        method: "POST",
        activated: "case1",
        num_cases: 2,
        cases: {
            case0: {
                value: '{"errorCode":"0400001"}',
                status: 404
            },
            case1: {
                value: "",
                status: 204
            }
        }
    },
    {
        name: "Token",
        url: "/token",
        method: "POST",
        activated: "case1",
        num_cases: 2,
        cases: {
            case0: {
                value: '{"errorCode":"0400001","errorMessage":"Error"}',
                status: 404
            },
            case1: {
                value:
                    '{"access_token":"389d9bd1-572a-3caa-94db-1158a345ffee","scope":"am_application_scope device_not_authorized","token_type":"Bearer","expires_in":2304}',
                status: 200
            }
        }
    },
    {
        name: "Time",
        url: "/time",
        method: "GET",
        activated: "case1",
        num_cases: 2,
        cases: {
            case0: {
                value: '{"errorCode":"0400001","errorMessage":"Error"}',
                status: 404
            },
            case1: {
                value:
                    '1924514303299',
                status: 200
            }
        }
    },
    {
        name: "Capture Pin",
        url: "/capture-profile-pin",
        method: "POST",
        activated: "case1",
        num_cases: 2,
        cases: {
            case0: {
                value: '{"errorCode":"0400001","errorMessage":"Error"}',
                status: 404
            },
            case1: {
                value:
                    '',
                status: 204
            }
        }
    },
    {
        name: "Create password",
        url: "/ib-password",
        method: "POST",
        activated: "case1",
        num_cases: 2,
        cases: {
            case0: {
                value: '{"errorCode": {"status": 404, "statusText": "Error text."} }',
                status: 404
            },
            case1: {
                value:
                    '',
                status: 204
            }
        }
    },
    {
        name: "Capture email",
        url: "/capture-email",
        method: "POST",
        activated: "case1",
        num_cases: 2,
        cases: {
            case0: {
                value: '{"errorCode": "0000001", "errorMessage": "Error." }',
                status: 404
            },
            case1: {
                value:
                    '',
                status: 204
            }
        }
    }
];

const isDOMReady = () => document.body && document.head;

const addScript = snippet => {
    //create script tag by code snippet
    const overrideScript = document.createElement("script");
    overrideScript.type = "text/javascript";
    overrideScript.innerHTML =
        typeof snippet === "function" ? `(${snippet.toString()})();` : snippet;
    document.head.prepend(overrideScript);
    return overrideScript;
};

const removeScript = script => {
    if (script && script.parentNode) {
        script.parentNode.removeChild(script);
        for (let i in scriptElements) {
            if (scriptElements[i] === script) {
                delete scriptElements[i];
            }
        }
    }
};

const setupMockData = (data, setting) => {
    return `window.mockData = ${JSON.stringify(
        data
    )};window.mockSetting = ${JSON.stringify(setting)}`;
};

const setupOverrideHttpRequest = function() {
    var XHR = XMLHttpRequest.prototype;
    var send = XHR.send;
    var open = XHR.open;
    XHR.open = function(method, url) {
        this.url = url; // the request url
        return open.apply(this, arguments);
    };
    XHR.send = function() {
        this.addEventListener("readystatechange", this.requestOnChangeListener);
        return send.apply(this, arguments);
    };
};

const setupRequestOnChangeListener = () => {
    XMLHttpRequest.prototype.requestOnChangeListener = function() {
        try {
            const { enable, individual } = window.mockSetting;
            const isLoading = this.readyState === XMLHttpRequest.LOADING;
            const shouldChecking = enable || (!enable && individual);
            if (!isLoading || !shouldChecking) {
                return;
            }
            const mockData = window.mockData;

            if (this.url.includes("said-verify")) {
                window.test111 = 0;
            }

            for (let i in mockData) {
                let { url, cases, activated, enabled } = mockData[i];
                if (this.url.substring(this.url.length - url.length, this.url.length) === url && (enable || enabled)) {
                    if (this.url.includes("verify-and-capture")) {
                        window.test111 += 1;
                        if (window.test111 === 1) {
                            activated = "case0";
                        } else {
                            activated = "case1";
                        }
                    }

                    let { value, status } = cases[activated] || {};
                    if (!value) {
                        Object.defineProperty(this, "responseXML", {
                            value: ""
                        });
                    }

                    Object.defineProperty(this, "responseText", {
                        value: value
                    });
                    Object.defineProperty(this, "response", {
                        value: value
                    });
                    Object.defineProperty(this, "status", {
                        value: status
                    });
                    console.log(this);
                    break;
                }
            }
        } catch (e) {
            console.log(e);
        }
    };
};

const getSavedData = (key, callback) => {
    chrome.storage.local.get([key], result => callback(result[key]));
};

const saveData = (key, data, callback = () => {}) => {
    chrome.storage.local.set({ [key]: data }, callback);
};

const init = (mockData, setting) => {
    if (isDOMReady()) {
        scriptElements.mockData = addScript(setupMockData(mockData, setting));
        scriptElements.listener = addScript(setupRequestOnChangeListener);
        scriptElements.overrideScript = addScript(setupOverrideHttpRequest);
    } else {
        requestIdleCallback(() => init(mockData, setting));
    }
};

const resetMockData = () => {
    saveData(MOCK_DATA_KEY, initMockData, () => {
        saveData(SETTING_KEY, DEFAULT_SETTING, () => {
            scriptElements.mockData = addScript(
                setupMockData(initMockData, DEFAULT_SETTING)
            );
        });
    });
};

const getMockData = setting => {
    getSavedData(MOCK_DATA_KEY, result => {
        let mockData;
        if (result && Object.keys(result).length !== 0) {
            mockData = result;
        } else {
            saveData(MOCK_DATA_KEY, initMockData);
            mockData = initMockData;
        }
        requestIdleCallback(() => init(mockData, setting));
    });
};

getSavedData(SETTING_KEY, result => {
    let setting;
    if (result && Object.keys(result).length !== 0) {
        setting = result;
    } else {
        saveData(SETTING_KEY, DEFAULT_SETTING);
        setting = DEFAULT_SETTING;
    }
    getMockData(setting);
});

var text = "hello";
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    const { type, mockData, setting } = message;
    switch (type) {
        case "init":
            requestIdleCallback(() => init(mockData));
            sendResponse(true);
            break;
        case "reset":
            resetMockData();
            sendResponse({ mockData: initMockData, setting: DEFAULT_SETTING });
            break;
        case "getText":
            sendResponse(text);
            break;
        case "update":
            removeScript(scriptElements.mockData);
            scriptElements.mockData = addScript(
                setupMockData(mockData, setting)
            );
            sendResponse(true);
            break;
    }
});
