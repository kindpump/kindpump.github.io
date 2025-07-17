(function (Scratch) {
    'use strict';

    let yaw = 0;
    let pitch = 0;
    let roll = 0;
    let permissionRequested = false;

    // Setup: Create a button in the DOM for iOS permission
    const button = document.createElement('button');
    button.innerText = 'Enable Gyroscope';
    Object.assign(button.style, {
        position: 'absolute',
        top: '10px',
        left: '10px',
        zIndex: 9999,
        fontSize: '16px',
        padding: '8px 12px',
        borderRadius: '6px',
        border: 'none',
        backgroundColor: '#4b92e8',
        color: '#fff'
    });

    button.onclick = () => {
        if (typeof DeviceOrientationEvent !== 'undefined' &&
            typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then((response) => {
                    if (response === 'granted') {
                        window.addEventListener('deviceorientation', handleOrientation, true);
                        button.remove();
                    } else {
                        alert('Gyroscope access denied.');
                    }
                })
                .catch((err) => {
                    alert('Gyro error: ' + err);
                });
        } else {
            // Fallback for older or non-iOS devices
            window.addEventListener('deviceorientation', handleOrientation, true);
            button.remove();
        }
    };

    document.body.appendChild(button);

    function handleOrientation(event) {
        yaw = event.alpha ?? 0;
        pitch = event.beta ?? 0;
        roll = event.gamma ?? 0;
    }

    class GyroExtension {
        getInfo() {
            return {
                id: 'iosGyro',
                name: 'iPhone Gyroscope',
                color1: '#4b92e8',
                color2: '#3b7ed0',
                blocks: [
                    {
                        opcode: 'getYaw',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Yaw (alpha)'
                    },
                    {
                        opcode: 'getPitch',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Pitch (beta)'
                    },
                    {
                        opcode: 'getRoll',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Roll (gamma)'
                    }
                ]
            };
        }

        getYaw() {
            return Math.round(yaw * 100) / 100;
        }

        getPitch() {
            return Math.round(pitch * 100) / 100;
        }

        getRoll() {
            return Math.round(roll * 100) / 100;
        }
    }

    Scratch.extensions.register(new GyroExtension());

})(Scratch);
