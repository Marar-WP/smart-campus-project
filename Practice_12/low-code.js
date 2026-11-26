export default {
  bookings: [{start:600,end:660}],
  check(startText, durationText, blocked) {
    const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(String(startText));
    const start = match ? Number(match[1])*60+Number(match[2]) : NaN;
    const duration = String(durationText).trim() === '' ? NaN : Number(durationText);
    const end = start + duration;
    let reason = 'ok';
    if (!Number.isInteger(start) || !Number.isInteger(duration) || start <= 540 || duration <= 0 || end > 1440) reason = 'invalid_interval';
    else if (duration > 120) reason = 'duration_too_long';
    else if (blocked) reason = 'room_blocked';
    else if (this.bookings.some(b => start < b.end && end > b.start)) reason = 'overlap';
    const messages = {ok:'This time slot is available for booking.',invalid_interval:'Enter a future start and positive whole-minute duration within the day.',duration_too_long:'Booking exceeds the 120 minute maximum.',room_blocked:'This room is blocked.',overlap:'The requested interval overlaps an existing booking.'};
    return {available:reason==='ok',reason,message:messages[reason]};
  }
}
