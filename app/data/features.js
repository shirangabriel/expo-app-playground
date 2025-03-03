const list = [
    {
        title: 'Onboarding Animation',
        slug: 'features/OnboardingButtonAnimation'
    },
    {
        title: 'Webview',
        slug: 'features/webviewsession'
    },
    {
        title: 'URL Based Routing',
        slug: 'features/'
    },
    {
        title: 'Change Theme',
        slug: 'features/ChangeTheme'
    },
    {
        title: 'Count Down Timer',
        slug: 'features/CountDownAnimation'
    },
    {
        title: 'Pinch Gestures',
        slug: 'features/PinchGestures'
    },
    {
        title: 'Image Pinch To Scale',
        slug: 'features/ImagePinchToScale'
    },
    {
        title: 'Neumorphism Design',
        slug: 'features/NeumorphismDesign'
    },
    {
        title: '🧸 Zustand',
        slug: 'features/Zustand'
    },
    {
        title: 'Run App',
        slug: 'features/RunApp'
    },
    {
        title: 'Gravity Animation',
        slug: 'features/GravityAnimation'
    }
];


let obj = {}

for (const key in list) {
    let uniqueKey = `f${key}`
    let temp = list[key]
    temp['id'] = uniqueKey
    obj[uniqueKey] = temp
}


console.log("calculating Feature list");


export const features = obj