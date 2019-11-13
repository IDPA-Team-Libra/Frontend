/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, ComponentFactoryResolver, EventEmitter, Inject, Input, Output, Type, Optional, } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';
import { NbComponentPortal } from '../cdk/overlay/mapping';
import { NbAdjustment, NbPosition, NbPositionBuilderService, } from '../cdk/overlay/overlay-position';
import { NbOverlayService, patch } from '../cdk/overlay/overlay-service';
import { NbTrigger, NbTriggerStrategyBuilderService } from '../cdk/overlay/overlay-trigger';
import { NbDatepickerContainerComponent } from './datepicker-container.component';
import { NB_DOCUMENT } from '../../theme.options';
import { NbCalendarRangeComponent } from '../calendar/calendar-range.component';
import { NbCalendarComponent } from '../calendar/calendar.component';
import { NbCalendarSize, NbCalendarViewMode, } from '../calendar-kit/model';
import { NbDateService } from '../calendar-kit/services/date.service';
import { NB_DATE_SERVICE_OPTIONS, NbDatepicker } from './datepicker.directive';
import { convertToBoolProperty } from '../helpers';
/**
 * The `NbBasePicker` component concentrates overlay manipulation logic.
 * */
let NbBasePicker = class NbBasePicker extends NbDatepicker {
    constructor(document, positionBuilder, triggerStrategyBuilder, overlay, cfr, dateService, dateServiceOptions) {
        super();
        this.document = document;
        this.positionBuilder = positionBuilder;
        this.triggerStrategyBuilder = triggerStrategyBuilder;
        this.overlay = overlay;
        this.cfr = cfr;
        this.dateService = dateService;
        this.dateServiceOptions = dateServiceOptions;
        /**
         * Defines if we should render previous and next months
         * in the current month view.
         * */
        this.boundingMonth = true;
        /**
         * Defines starting view for calendar.
         * */
        this.startView = NbCalendarViewMode.DATE;
        /**
         * Size of the calendar and entire components.
         * Can be 'medium' which is default or 'large'.
         * */
        this.size = NbCalendarSize.MEDIUM;
        /**
         * Hide picker when a date or a range is selected, `true` by default
         * @type {boolean}
         */
        this.hideOnSelect = true;
        /**
         * Determines should we show calendars header or not.
         * @type {boolean}
         */
        this.showHeader = true;
        /**
         * Sets symbol used as a header for week numbers column
         * */
        this.weekNumberSymbol = '#';
        this._showWeekNumber = false;
        this.init$ = new ReplaySubject();
        /**
         * Stream of picker changes. Required to be the subject because picker hides and shows and picker
         * change stream becomes recreated.
         * */
        this.onChange$ = new Subject();
        this.alive = true;
        this.blur$ = new Subject();
    }
    /**
     * Determines should we show week numbers column.
     * False by default.
     * */
    get showWeekNumber() {
        return this._showWeekNumber;
    }
    set showWeekNumber(value) {
        this._showWeekNumber = convertToBoolProperty(value);
    }
    /**
     * Returns picker instance.
     * */
    get picker() {
        return this.pickerRef && this.pickerRef.instance;
    }
    /**
     * Stream of picker value changes.
     * */
    get valueChange() {
        return this.onChange$.asObservable();
    }
    get isShown() {
        return this.ref && this.ref.hasAttached();
    }
    get init() {
        return this.init$.asObservable();
    }
    /**
     * Emits when datepicker looses focus.
     */
    get blur() {
        return this.blur$.asObservable();
    }
    ngOnInit() {
        this.checkFormat();
    }
    ngOnChanges(changes) {
        if (changes.format && !changes.format.isFirstChange()) {
            this.checkFormat();
        }
    }
    ngAfterViewInit() {
        this.init$.next();
    }
    ngOnDestroy() {
        this.alive = false;
        this.hide();
        this.init$.complete();
        if (this.ref) {
            this.ref.dispose();
        }
        if (this.triggerStrategy) {
            this.triggerStrategy.destroy();
        }
    }
    /**
     * Datepicker knows nothing about host html input element.
     * So, attach method attaches datepicker to the host input element.
     * */
    attach(hostRef) {
        this.hostRef = hostRef;
        this.subscribeOnTriggers();
    }
    getValidatorConfig() {
        return { min: this.min, max: this.max, filter: this.filter };
    }
    show() {
        if (!this.ref) {
            this.createOverlay();
        }
        this.openDatepicker();
    }
    shouldHide() {
        return this.hideOnSelect && !!this.value;
    }
    hide() {
        if (this.ref) {
            this.ref.detach();
        }
        // save current value if picker was rendered
        if (this.picker) {
            this.queue = this.value;
            this.pickerRef.destroy();
            this.pickerRef = null;
            this.container = null;
        }
    }
    createOverlay() {
        this.positionStrategy = this.createPositionStrategy();
        this.ref = this.overlay.create({
            positionStrategy: this.positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
        });
        this.subscribeOnPositionChange();
    }
    openDatepicker() {
        this.container = this.ref.attach(new NbComponentPortal(NbDatepickerContainerComponent, null, null, this.cfr));
        this.instantiatePicker();
        this.subscribeOnValueChange();
        this.writeQueue();
        this.patchWithInputs();
    }
    createPositionStrategy() {
        return this.positionBuilder
            .connectedTo(this.hostRef)
            .position(NbPosition.BOTTOM)
            .adjustment(NbAdjustment.COUNTERCLOCKWISE);
    }
    subscribeOnPositionChange() {
        this.positionStrategy.positionChange
            .pipe(takeWhile(() => this.alive))
            .subscribe((position) => patch(this.container, { position }));
    }
    createTriggerStrategy() {
        return this.triggerStrategyBuilder
            .trigger(NbTrigger.FOCUS)
            .host(this.hostRef.nativeElement)
            .container(() => this.container)
            .build();
    }
    subscribeOnTriggers() {
        this.triggerStrategy = this.createTriggerStrategy();
        this.triggerStrategy.show$.subscribe(() => this.show());
        this.triggerStrategy.hide$.subscribe(() => {
            this.blur$.next();
            this.hide();
        });
    }
    instantiatePicker() {
        this.pickerRef = this.container.instance.attach(new NbComponentPortal(this.pickerClass, null, null, this.cfr));
    }
    /**
     * Subscribes on picker value changes and emit data through this.onChange$ subject.
     * */
    subscribeOnValueChange() {
        this.pickerValueChange.subscribe(date => {
            this.onChange$.next(date);
        });
    }
    patchWithInputs() {
        this.picker.boundingMonth = this.boundingMonth;
        this.picker.startView = this.startView;
        this.picker.min = this.min;
        this.picker.max = this.max;
        this.picker.filter = this.filter;
        this.picker._cellComponent = this.dayCellComponent;
        this.picker.monthCellComponent = this.monthCellComponent;
        this.picker._yearCellComponent = this.yearCellComponent;
        this.picker.size = this.size;
        this.picker.showHeader = this.showHeader;
        this.picker.visibleDate = this.visibleDate;
        this.picker.showWeekNumber = this.showWeekNumber;
        this.picker.weekNumberSymbol = this.weekNumberSymbol;
    }
    checkFormat() {
        if (this.dateService.getId() === 'native' && this.format) {
            throw new Error('Can\'t format native date. To use custom formatting you have to install @nebular/moment or ' +
                '@nebular/date-fns package and import NbMomentDateModule or NbDateFnsDateModule accordingly.' +
                'More information at "Formatting issue" ' +
                'https://akveo.github.io/nebular/docs/components/datepicker/overview#nbdatepickercomponent');
        }
        const isFormatSet = this.format || (this.dateServiceOptions && this.dateServiceOptions.format);
        if (this.dateService.getId() === 'date-fns' && !isFormatSet) {
            throw new Error('format is required when using NbDateFnsDateModule');
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], NbBasePicker.prototype, "format", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], NbBasePicker.prototype, "boundingMonth", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], NbBasePicker.prototype, "startView", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbBasePicker.prototype, "min", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbBasePicker.prototype, "max", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], NbBasePicker.prototype, "filter", void 0);
__decorate([
    Input(),
    __metadata("design:type", Type)
], NbBasePicker.prototype, "dayCellComponent", void 0);
__decorate([
    Input(),
    __metadata("design:type", Type)
], NbBasePicker.prototype, "monthCellComponent", void 0);
__decorate([
    Input(),
    __metadata("design:type", Type)
], NbBasePicker.prototype, "yearCellComponent", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], NbBasePicker.prototype, "size", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbBasePicker.prototype, "visibleDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], NbBasePicker.prototype, "hideOnSelect", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], NbBasePicker.prototype, "showHeader", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], NbBasePicker.prototype, "weekNumberSymbol", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NbBasePicker.prototype, "showWeekNumber", null);
NbBasePicker = __decorate([
    __param(0, Inject(NB_DOCUMENT)),
    __param(6, Optional()), __param(6, Inject(NB_DATE_SERVICE_OPTIONS)),
    __metadata("design:paramtypes", [Object, NbPositionBuilderService,
        NbTriggerStrategyBuilderService,
        NbOverlayService,
        ComponentFactoryResolver,
        NbDateService, Object])
], NbBasePicker);
export { NbBasePicker };
/**
 * The DatePicker components itself.
 * Provides a proxy to `NbCalendar` options as well as custom picker options.
 */
let NbDatepickerComponent = class NbDatepickerComponent extends NbBasePicker {
    /**
     * The DatePicker components itself.
     * Provides a proxy to `NbCalendar` options as well as custom picker options.
     */
    constructor() {
        super(...arguments);
        this.pickerClass = NbCalendarComponent;
    }
    /**
     * Date which will be rendered as selected.
     * */
    set date(date) {
        this.value = date;
    }
    /**
     * Emits date when selected.
     * */
    get dateChange() {
        return this.valueChange;
    }
    get value() {
        return this.picker ? this.picker.date : undefined;
    }
    set value(date) {
        if (!this.picker) {
            this.queue = date;
            return;
        }
        if (date) {
            this.visibleDate = date;
            this.picker.visibleDate = date;
            this.picker.date = date;
        }
    }
    get pickerValueChange() {
        return this.picker.dateChange;
    }
    writeQueue() {
        if (this.queue) {
            const date = this.queue;
            this.queue = null;
            this.value = date;
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NbDatepickerComponent.prototype, "date", null);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter),
    __metadata("design:paramtypes", [])
], NbDatepickerComponent.prototype, "dateChange", null);
NbDatepickerComponent = __decorate([
    Component({
        selector: 'nb-datepicker',
        template: ''
    })
], NbDatepickerComponent);
export { NbDatepickerComponent };
/**
 * The RangeDatePicker components itself.
 * Provides a proxy to `NbCalendarRange` options as well as custom picker options.
 */
let NbRangepickerComponent = class NbRangepickerComponent extends NbBasePicker {
    /**
     * The RangeDatePicker components itself.
     * Provides a proxy to `NbCalendarRange` options as well as custom picker options.
     */
    constructor() {
        super(...arguments);
        this.pickerClass = NbCalendarRangeComponent;
    }
    /**
     * Range which will be rendered as selected.
     * */
    set range(range) {
        this.value = range;
    }
    /**
     * Emits range when start selected and emits again when end selected.
     * */
    get rangeChange() {
        return this.valueChange;
    }
    get value() {
        return this.picker ? this.picker.range : undefined;
    }
    set value(range) {
        if (!this.picker) {
            this.queue = range;
            return;
        }
        if (range) {
            const visibleDate = range && range.start;
            this.visibleDate = visibleDate;
            this.picker.visibleDate = visibleDate;
            this.picker.range = range;
        }
    }
    get pickerValueChange() {
        return this.picker.rangeChange;
    }
    shouldHide() {
        return super.shouldHide() && !!(this.value && this.value.start && this.value.end);
    }
    writeQueue() {
        if (this.queue) {
            const range = this.queue;
            this.queue = null;
            this.value = range;
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NbRangepickerComponent.prototype, "range", null);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter),
    __metadata("design:paramtypes", [])
], NbRangepickerComponent.prototype, "rangeChange", null);
NbRangepickerComponent = __decorate([
    Component({
        selector: 'nb-rangepicker',
        template: ''
    })
], NbRangepickerComponent);
export { NbRangepickerComponent };
//# sourceMappingURL=datepicker.component.js.map