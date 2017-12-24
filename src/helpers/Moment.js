class Moment {
  isExpired(date, days) {
    let updated_at = new Date(date);
    let _date = new Date();
    _date.setDate(_date.getDate() - days);
    return updated_at.getTime() < _date.getTime();
  }
}

export let moment = new Moment();