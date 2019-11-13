import { NbDateService } from '../../services/date.service';
import { NbCalendarSize } from '../../model';
export declare class NbCalendarWeekNumberComponent<D> {
    private dateService;
    weeks: D[][];
    size: NbCalendarSize;
    /**
     * Sets symbol used as a header for week numbers column
     * */
    weekNumberSymbol: string;
    readonly isMedium: boolean;
    readonly isLarge: boolean;
    constructor(dateService: NbDateService<D>);
    getWeeks(): number[];
}
