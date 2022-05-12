<script setup>
import { ref, computed } from 'vue';
import stopWatch from './components/StopWatch.vue'

function Result(ans, time) {
this.ans = false;
this.time = false;
};

var resultsArray = [];

var scoreval = 0;

const questions = ref([
  {
	question: 'Test Question',
	answer: 1,
	options: [
		'Wrong',
		'Correct',
		'Also Wrong'
	],
	selected: null
  },
//   {
// 	question: 'What is Vue?',
// 	answer: 0,
// 	options: [
// 		'A framework',
// 		'A library',
// 		'A type of hat'
// 	],
// 	selected: null
//   },
//   {
// 	question: 'What is Vuex used for?',
// 	answer: 2,
// 	options: [
// 		'Eating a delicious snack',
// 		'Viewing things',
// 		'State management'
// 	],
// 	selected: null
//   },
//   {
// 	question: 'What is Vue Router?',
// 	answer: 1,
// 	options: [
// 		'An ice cream maker',
// 		'A routing library for Vue',
// 		'Burger sauce'
// 	],
// 	selected: null
//   }
])

const quizCompleted = ref(false)
const currentQuestion = ref(0)
const score = computed(() => {
	let value = 0
	questions.value.map(q => {
		if (q.selected != null && q.answer == q.selected) {
			console.log('correct');
			value++
		}
	})
	return scoreval
})

const getCurrentQuestion = computed(() => {
	let question = questions.value[currentQuestion.value]
	question.index = currentQuestion.value
	return question
})

const SetAnswer = (e) => {
	questions.value[currentQuestion.value].selected = e.target.value
	e.target.value = null
}

function Answered(i,ans) {

	var a = false
    var t = 0

	

	console.log(i,ans)
	if (i == ans) {
		a = true
		resultsArray.push(new Result(a,t));
		return 'correct'
	}
	else {

		resultsArray.push(new Result(a,t));
		return 'wrong'
	}

}

const NextQuestion = () => {
	if (currentQuestion.value < questions.value.length - 1) {
		currentQuestion.value++
		return
	}
	
	quizCompleted.value = true
}

</script>

<template>
	<main class="app">
		 <section>
			<stop-watch
			v-show="isStarted || isFinished"
			ref="stopWatch"
			class="digits"
			hours="false"
			minutes
			@start="setStartTime"
			@stop="setStopTime"
			@lap="setLapTime"
			/>

			<button @click="$refs.stopWatch.start()">Start</button>
			<button @click="$refs.stopWatch.lap('42')">Lap</button>
			<button @click="$refs.stopWatch.stop()">Stop</button>
			<button @click="$refs.stopWatch.reset()">Reset</button>
		</section>
		<h1>The Quiz</h1>
		
		<section class="quiz" v-if="!quizCompleted">
			<div class="quiz-info">
				<span class="question">{{ getCurrentQuestion.question }}</span>
				<span class="score">Score {{ score }}/{{ questions.length }}</span>
			</div>
			
			<div class="options">
				<label 
					v-for="(option, index) in getCurrentQuestion.options" 
					:for="'option' + index" 
					:class="`option ${
						getCurrentQuestion.selected == index 
							? Answered(index,getCurrentQuestion.answer)
							: ''
					} ${
						getCurrentQuestion.selected != null &&
						index != getCurrentQuestion.selected
							? 'disabled'
							: ''
					}`">
					<input 
						type="radio" 
						:id="'option' + index" 
						:name="getCurrentQuestion.index" 
						:value="index" 
						v-model="getCurrentQuestion.selected" 
						:disabled="getCurrentQuestion.selected"
						@change="SetAnswer" 
					/>
					<span>{{ option }}</span>
				</label>
			</div>
			
			<button 
				@click="NextQuestion" 
				:disabled="!getCurrentQuestion.selected">
				{{ 
					getCurrentQuestion.index == questions.length - 1 
						? 'Finish' 
						: getCurrentQuestion.selected == null
							? 'Select an option'
							: 'Next question'
				}}
			</button>
		</section>

		<section v-else>
			<h2>You have finished the quiz!</h2>
			<p>Your score is {{ score }}/{{ questions.length }}</p>
		</section>
	</main>
</template>

<script>
export default {
  methods: {
    setStartTime(timestamp) {
      console.log(timestamp);
    },
    stopWatch(timestamp, formattedTime) {
      console.log(timestamp, formattedTime);
    },
    setLapTime(timestamp, formattedTime, id) {
      console.log(timestamp, formattedTime, id);
    },
  },
};
</script>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Montserrat', sans-serif;
}

body {
	background-color: #361c33;
	color: #FFF;
}

.app {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 2rem;
	height: 100vh;
}

h1 {
	font-size: 2rem;
	margin-bottom: 2rem;
}

.quiz {
	background-color: #4a2a4b;
	padding: 1rem;
	width: 100%;
	max-width: 640px;
}

.quiz-info {
	display: flex;
	justify-content: space-between;
	margin-bottom: 1rem;
}

.quiz-info .question {
	color: #8F8F8F;
	font-size: 1.25rem;
}

.quiz-info.score {
	color: #FFF;
	font-size: 1.25rem;
}

.options {
	margin-bottom: 1rem;
}

.option {
	padding: 1rem;
	display: block;
	background-color: #331c36;
	margin-bottom: 0.5rem;
	border-radius: 0.5rem;
	cursor: pointer;
}

.option:hover {
	background-color: #3f213d;
}

.option.correct {
	background-color: #2cce7d;
}

.option.wrong {
	background-color: #ff5a5f;
}

.option:last-of-type {
	margin-bottom: 0;
}

.option.disabled {
	opacity: 0.5;
}

.option input {
	display: none;
}

button {
	appearance: none;
	outline: none;
	border: none;
	cursor: pointer;
	padding: 0.5rem 1rem;
	background-color: #2c85ce;
	color: #2d213f;
	font-weight: 700;
	text-transform: uppercase;
	font-size: 1.2rem;
	border-radius: 0.5rem;
}

button:disabled {
	opacity: 0.5;
}

h2 {
	font-size: 2rem;
	margin-bottom: 2rem;
	text-align: center;
}

p {
	color: #8F8F8F;
	font-size: 1.5rem;
	text-align: center;
}
</style>