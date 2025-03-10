const list = [
    {
        title: 'Onboarding Animation',
        slug: 'features/OnboardingButtonAnimation',
        "icon": '🚀'
    },
    {
        title: 'Change Theme',
        slug: 'features/ChangeTheme',
        "icon": '🎨'
    },
    {
        title: 'Count Down Timer',
        slug: 'features/CountDownAnimation',
        "icon": '⏳'
    },
    {
        title: 'Pinch Gestures',
        slug: 'features/PinchGestures',
        "icon": '👌'
    },
    {
        title: 'Image Pinch To Scale',
        slug: 'features/ImagePinchToScale',
        "icon": '🔍'
    },
    {
        title: 'Neumorphism Design',
        slug: 'features/NeumorphismDesign',
        "icon": '🔵'
    },
    {
        title: 'Zustand',
        slug: 'features/Zustand',
        "icon": '🧸'
    },
    {
        title: 'Run App',
        slug: 'features/RunApp',
        "icon": '🏃'
    },
    {
        title: 'Gravity Animation',
        slug: 'features/GravityAnimation',
        "icon": '🌌'
    },
    {
        title: 'Credit Card Reveal Animation',
        slug: 'features/CreditCardRevealAnimation',
        icon: '💳'
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