import { animate, transition, trigger, style, query } from '@angular/animations';

export const routingAnime = trigger('routeState', [
    transition('* => *', [
        query(':enter', [
            style({ opacity: 0 }),
            animate(250, style({ opacity: 1 }))
        ], { optional: true }),
        query(':leave', [
            animate(250, style({ opacity: 0 }))
        ], { optional: true })
    ])
]);
