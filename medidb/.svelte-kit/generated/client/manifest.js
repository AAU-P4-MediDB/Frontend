export { matchers } from './matchers.js';

export const nodes = [() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13')];

export const server_loads = [];

export const dictionary = {
	"/": [~4],
	"/(internal)/calendar": [6,[3]],
	"/(internal)/componentExamples": [7,[3]],
	"/(internal)/home": [8,[3]],
	"/(external)/login": [5,[2]],
	"/(internal)/patients/dashboard": [9,[3]],
	"/(internal)/patients/overview": [10,[3]],
	"/(internal)/patients/permissions": [11,[3]],
	"/(internal)/patients/test_results": [12,[3]],
	"/(internal)/settings": [13,[3]]
};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};