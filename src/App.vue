<template>
    <div class="main">
        <button @click = "myAnimation = 'slide'">Slide</button>
        <button @click = "myAnimation = 'fade'">Fade</button>
        <p>{{  myAnimation }}</p>
        <br>
        <button @click="add">追加</button>
        <ul style="width: 200px; margin: auto;">
            <transition-group name="fade" tag="div">
                <li
                    style="cursor: pointer;"
                    v-for="(number, index) in numbers"
                    :key="number"
                    @click="remove(index)"
                >
                    {{ number }}
                </li>
            </transition-group>
        </ul>
        <br>
        <button @click="show = !show">切り替え</button>
        <br><br>
        <transition
            :css = "false"
            @before-enter = "beforeEnter"
            @enter = "enter"
            @leave = "leave"
        >
            <div class="circle" v-if="show"></div>
        </transition>
        <button @click = "myComponent = 'ComponentA'">ComponentA</button>
        <button @click = "myComponent = 'ComponentB'">ComponentB</button>
        <transition name="fade" mode="out-in">
            <component :is="myComponent"></component>
        </transition>
    </div>
</template>

<script>
import ComponentA from './components/ComponentA.vue';
import ComponentB from './components/ComponentB.vue';

export default {
    components: {
        ComponentA,
        ComponentB,
    },
    data() {
        return {
            numbers: [0, 1, 2],
            nextNumber: 3,
            show: true,
            myAnimation: 'slide',
            myComponent: 'ComponentA',
        }
    },
    methods: {
        randomIndex() {
            return Math.floor(Math.random() * this.numbers.length)
        },
        add() {
            this.numbers.splice(this.randomIndex(), 0, this.nextNumber);
            this.nextNumber++;
        },
        remove(index) {
            this.numbers.splice(index, 1);
        },
        beforeEnter(el) {
            el.style.transform = 'scale(0)'
        },
        enter(el, done) {
            let scale = 0;
            const interval = setInterval(() => {
                el.style.transform = `scale(${scale})`;
                scale += .1;
                if (scale > 1) {
                    clearInterval(interval);
                    done();
                }
            }, 2);
        },
        leave(el, done) {
            let scale = 1;
            const interval = setInterval(() => {
                el.style.transform = `scale(${scale})`;
                scale -= .1;
                if (scale < 0) {
                    clearInterval(interval);
                    done();
                }
            }, 2);
        },
    }
}
</script>

<style scoped>
.circle {
    width: 200px;
    height: 200px;
    margin: 5rem auto;
    background-color: deeppink;
    border-radius: 50%;
}

.fade-move {
    transition: transform 1s ;
}
.fade-enter {
    opacity: 0;
}
.fade-enter-active {
    transition: opacity 1s;
}
.fade-enter-to {
    opacity: 1;
}
.fade-leave {
    opacity: 1;
}
.fade-leave-active {
    transition: opacity 1s;
    position: absolute;
    width: 200px;
}
.fade-leave-to {
    opacity: 0;
}

.slide-enter,
.slide-leave-to {
    opacity: 0;
}

.slide-enter-active {
    animation: slide-in .5s;
    transition: opacity .5s;
}
.slide-leave-active {
    animation: slide-in .5s reverse;
    transition: opacity .5s;
}

@keyframes slide-in {
    from {
        transform: translateX(100px);
    }
    to {
        transform: translateX(0);
    }
}

.main {
    width: 70%;
    margin: auto;
    padding-top: 5rem;
    text-align: center
}
</style>