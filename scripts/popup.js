// content + toggle button

const textContent = {
    name: 'NeonAuto Premium',
    about: {
        button: 'GUIDE',
        text: `<p>
                        I'm <strong>Jaizon Carlos</strong>, a web Dev/ Design
                        student who love to mess with stuff, right now I'm
                        unemployed so I started playing with blockchain games to
                        earn an extra income. That's when I thought in starting
                        this script. Now it is packed into an extension so that
                        I can freely share it with everyone else.
                    </p>
                    <p>
                        I'd love to receive some feedback on it if you could
                        just drop me a message on
                        <a
                            target="_blank"
                            href="https://www.facebook.com/carlos.jaizon/"
                            >Facebook</a
                        >,
                        <a
                            target="_blank"
                            href="https://www.instagram.com/jaizon.carlos/"
                            >Instagram</a
                        >
                        or
                        <a
                            target="_blank"
                            href="https://twitter.com/jaizoncarlos"
                            >Twitter</a
                        >. And even though this is not a finished product, if
                        you found it useful, any donations would be appreciated.
                    </p>
                    <p>
                        Just click in the button below and drop any amount you
                        find reasonable.
                    </p>`,
    },
    guide: {
        button: 'ABOUT',
        text: `<p>
                    This extension will only run once you are in the right <a
                    target="_blank" href="https://portal.neondistrict.io/neonpizza/delivery-agents">page</a>.
                    </p>
                    <br />
                    <h3>Right now it has the following functionalities:</h3>
                    <ul>
                        <li>it can be turned on and off</li>
                        <li>you can set the speed at which the script will cycle
                            <ul>
                                <li>S: Slow</li>
                                <li>N: Normal</li>
                                <li>F: Fast</li>
                            </ul>
                        </li>
                    </ul>
                    </br>
                    <p>it detects both the current speed and the power state and display them in their respective buttons.</p>
                    <br />
                    <p>
                        Sometimes it is needed to reload the Delivery Page, whenever you switch it on or off it automatically goes to the Delivery Page.
                    </p>
                    <p>
                        You can help out by sending me logs of error you might
                        find.
                    </p>
                    <p>
                        Just inspect the page, go to console, click the gear on
                        the right and leave only "Preserve Log" and "Group
                        similar Messages in console"
                    </p>`,
    },
}

const text = document.querySelector('.text')
const button = document.querySelector('.toggle')

const loadContent = (content, text, button) => {
    text.innerHTML = content.text
    button.innerHTML = content.button
}

loadContent(textContent.about, text, button)

button.addEventListener('click', () => {
    button.innerHTML === 'GUIDE'
        ? loadContent(textContent.guide, text, button)
        : loadContent(textContent.about, text, button)
})

//  state, change of timer

const allBt = document.querySelectorAll('.bt-storage')

const checkBt = (nat) => {
    allBt.forEach((bt) => {
        if (bt.dataset.nat == nat) {
            !bt.classList.contains('bt-active') && bt.classList.add('bt-active')
        } else {
            bt.classList.contains('bt-active') &&
                bt.classList.remove('bt-active')
        }
    })
}

const getData = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'getTimer' }, (timer) => {
            checkBt(timer)
        })
    })
}

const setData = (data) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            { type: 'setTimer', data },
            (timer) => {
                checkBt(timer)
            }
        )
    })
}

allBt.forEach((bt) => {
    bt.addEventListener('click', () => {
        setData(bt.dataset.nat)
    })
})

getData()

//  power toggle functionality
const bt = document.querySelector('.bt-power')

const checkPowerBt = (state) => {
    if (state === true) {
        bt.classList.add('bt-active')
    } else {
        bt.classList.remove('bt-active')
    }
}

const getPowerData = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'getState' }, (state) => {
            console.log(state)
            checkPowerBt(state)
        })
    })
}

const setPowerData = (data) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            { type: 'setState', data },
            (state) => {
                console.log(state)
                checkPowerBt(state)
            }
        )
    })
}

bt.addEventListener('click', () => {
    console.log(bt.classList.contains('bt-active'))
    setPowerData(bt.classList.contains('bt-active'))
})

getPowerData()
