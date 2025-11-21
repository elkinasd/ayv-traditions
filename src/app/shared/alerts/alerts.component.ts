import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

export type AvtAlertType = 'success' | 'error' | 'warning';
export type AvtAlertPosition = 'inline' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss',
})
export class AlertsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() type: AvtAlertType = 'success';
  @Input() title = '';
  @Input() message = '';
  @Input() dismissible = true;
  @Input() autoClose = false;
  @Input() autoCloseDelay = 5000; // ms
  @Input() showLogo = false;
  @Input() position: AvtAlertPosition = 'inline';

  @Output() closed = new EventEmitter<void>();

  isVisible = true;
  private timer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.setupAutoClose();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['autoClose'] ||
      changes['autoCloseDelay'] ||
      changes['message'] ||
      changes['type']
    ) {
      this.clearTimer();
      this.setupAutoClose();
    }
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  close(): void {
    this.isVisible = false;
    this.clearTimer();
    this.closed.emit();
  }

  get ariaRole(): 'alert' | 'status' {
    return this.type === 'error' || this.type === 'warning' ? 'alert' : 'status';
  }

  private setupAutoClose(): void {
    if (this.autoClose) {
      this.timer = setTimeout(() => this.close(), this.autoCloseDelay);
    }
  }

  private clearTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
