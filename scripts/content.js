if (localStorage.napt == undefined) localStorage.napt = 30000
if (localStorage.state === undefined) localStorage.state = true

const address = 'https://portal.neondistrict.io/neonpizza/delivery-agents'

const reload = (time = localStorage.napt) => {
    setTimeout(() => {
        if (window.location.href == address) {
            location.reload()
        } else window.location.href = address
    }, time)
}

const checkDelivery = () => {
    const buttons = document.querySelectorAll('.ui.mini.primary.button')

    buttons.forEach((button) => {
        if (
            (button.innerText == 'BANK PAY' &&
                !button.classList.contains('disabled')) ||
            button.innerText == 'START NEW SHIFT'
        )
            button.click()
    })
}

const checkAtack = (timer) => {
    const block = document.querySelector(
        '.row .DeliveryAgentView_gridRow__2JVyY'
    )
    if (block && block.children[1]) {
        const button = block.children[1].querySelector(
            '.ui.mini.secondary.button'
        )

        if (button) {
            button.click()
            setTimeout(() => {
                const contractBt = document.querySelector(
                    'a.ui.mini.primary.button'
                )
                if (
                    contractBt &&
                    contractBt.innerText == 'OPEN NEW HIT CONTRACT'
                ) {
                    contractBt.click()
                    setTimeout(() => {
                        const allButtons = Array.from(
                            document.querySelectorAll(
                                'button.ui.secondary.button'
                            )
                        )
                        if (
                            allButtons &&
                            allButtons.find(
                                (item) => item.innerText == 'MAKE PUBLIC'
                            )
                        ) {
                            allButtons
                                .find((item) => item.innerText == 'MAKE PUBLIC')
                                .click()
                            reload()
                        } else reload()
                    }, timer)
                } else reload()
            }, timer)
        } else reload()
    } else reload()
}

const runDelivery = (timer) => {
    setTimeout(() => {
        reload(timer * 8)
        checkDelivery()
        checkAtack(timer)
    }, timer * 3)
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.type) {
        case 'getState':
            sendResponse(JSON.parse(localStorage.state))
            break
        case 'getTimer':
            sendResponse(localStorage.napt)
            break
        case 'setState':
            localStorage.state = !message.data
            sendResponse(JSON.parse(localStorage.state))
            reload(1000)
            break
        case 'setTimer':
            if (!localStorage.napt || localStorage.napt != message.data)
                localStorage.napt = message.data
            sendResponse(localStorage.napt)
            break
        default:
            console.error('Unrecognised message: ', message)
    }
})

if (JSON.parse(localStorage.state)) {
    runDelivery(localStorage.napt)
}
