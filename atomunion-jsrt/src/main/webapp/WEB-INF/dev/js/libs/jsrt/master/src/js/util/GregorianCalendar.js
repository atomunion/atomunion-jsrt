/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 11, 2014
 */

$import("js.util.Calendar");

Class
		.forName({
			name : "abstract class js.util.GregorianCalendar extends js.util.Calendar",

			"private static final int EPOCH_OFFSET" : 719163,// Fixed date of
			// January 1,
			// 1970
			// (Gregorian)
			"private static final int EPOCH_YEAR" : 1970,

			"static final int MONTH_LENGTH" : [ 31, 28, 31, 30, 31, 30, 31, 31,
					30, 31, 30, 31 ], // 0-based
			"static final int LEAP_MONTH_LENGTH" : [ 31, 29, 31, 30, 31, 30,
					31, 31, 30, 31, 30, 31 ], // 0-based

			// Useful millisecond constants. Although ONE_DAY and ONE_WEEK can
			// fit
			// into ints, they must be longs in order to prevent arithmetic
			// overflow
			// when performing (bug 4173516).
			"private static final int  ONE_SECOND" : 1000,
			"private static final int  ONE_MINUTE" : 60 * 1000,
			"private static final int  ONE_HOUR" : 60 * 60 * 1000,
			"private static final long ONE_DAY " : 24 * 60 * 60 * 1000,
			"private static final long ONE_WEEK" : 7 * 24 * 60 * 60 * 1000,

			/*
			 * <pre> Greatest Least Field name Minimum Minimum Maximum Maximum
			 * ---------- ------- ------- ------- ------- YEAR 1 1 292269054
			 * 292278994 MONTH 0 0 11 11 WEEK_OF_YEAR 1 1 52* 53 WEEK_OF_MONTH 0
			 * 0 4* 6 DAY_OF_MONTH 1 1 28* 31 DAY_OF_YEAR 1 1 365* 366
			 * DAY_OF_WEEK 1 1 7 7 DAY_OF_WEEK_IN_MONTH -1 -1 4* 6 AM_PM 0 0 1 1
			 * HOUR 0 0 11 11 HOUR_OF_DAY 0 0 23 23 MINUTE 0 0 59 59 SECOND 0 0
			 * 59 59 MILLISECOND 0 0 999 999 </pre> *: depends on the Gregorian
			 * change date
			 */
			"static final int MIN_VALUES" : [ 1, // YEAR
			js.util.Calendar.JANUARY, // MONTH
			1, // WEEK_OF_YEAR
			0, // WEEK_OF_MONTH
			1, // DAY_OF_MONTH
			1, // DAY_OF_YEAR
			js.util.Calendar.SUNDAY, // DAY_OF_WEEK
			1, // DAY_OF_WEEK_IN_MONTH
			js.util.Calendar.AM, // AM_PM
			0, // HOUR
			0, // HOUR_OF_DAY
			0, // MINUTE
			0, // SECOND
			0 // MILLISECOND
			],
			"static final int LEAST_MAX_VALUES" : [ 292269054, // YEAR
			js.util.Calendar.DECEMBER, // MONTH
			52, // WEEK_OF_YEAR
			4, // WEEK_OF_MONTH
			28, // DAY_OF_MONTH
			365, // DAY_OF_YEAR
			js.util.Calendar.SATURDAY, // DAY_OF_WEEK
			4, // DAY_OF_WEEK_IN
			js.util.Calendar.PM, // AM_PM
			11, // HOUR
			23, // HOUR_OF_DAY
			59, // MINUTE
			59, // SECOND
			999 // MILLISECOND
			],
			"static final int MAX_VALUES" : [ 292278994, // YEAR
			js.util.Calendar.DECEMBER, // MONTH
			53, // WEEK_OF_YEAR
			6, // WEEK_OF_MONTH
			31, // DAY_OF_MONTH
			366, // DAY_OF_YEAR
			js.util.Calendar.SATURDAY, // DAY_OF_WEEK
			6, // DAY_OF_WEEK_IN
			js.util.Calendar.PM, // AM_PM
			11, // HOUR
			23, // HOUR_OF_DAY
			59, // MINUTE
			59, // SECOND
			999 // MILLISECOND
			],

			GregorianCalendar : function() {
				this.setTimeInMillis(js.lang.System.currentTimeMillis());
			},

			"protected computeTime" : function() {
				var Calendar = js.util.Calendar, GregorianCalendar = js.util.GregorianCalendar, year = this
						.isFieldSet(Calendar.YEAR) ? this.internalGet(Calendar.YEAR)
						: GregorianCalendar.EPOCH_YEAR, month = 0, day = 1,

				hours = 0, minutes = 0, seconds = 0, milliseconds = 0;

				if (this.isFieldSet(Calendar.MONTH)) {
					// No need to check if MONTH has been set (no isSet(MONTH)
					// call) since its unset value happens to be JANUARY (0).
					month = this.internalGet(Calendar.MONTH);

					// If the month is out of range, adjust it into range
					if (month > Calendar.DECEMBER) {
						year += month / 12;
						month %= 12;
					} else if (month < Calendar.JANUARY) {
						year -= (12 - month) / 12;
						month = 12 + month % 12;
					}

					// Month-based calculations
					if (this.isFieldSet(Calendar.DAY_OF_MONTH)) {
						// We are on the first day of the month. Just add the
						// offset if DAY_OF_MONTH is set. If the isSet call
						// returns false, that means DAY_OF_MONTH has been
						// selected just because of the selected
						// combination. We don't need to add any since the
						// default value is the 1st.
						// To avoid underflow with DAY_OF_MONTH-1, add
						// DAY_OF_MONTH, then subtract 1.
						day = this.internalGet(Calendar.DAY_OF_MONTH);
					} else {

						var truncMonth = new Date();
						truncMonth.setFullYear(year);
						truncMonth.setMonth(month);
						truncMonth.setDate(day);
						truncMonth.setHours(hours);
						truncMonth.setMinutes(minutes);
						truncMonth.setSeconds(seconds);
						truncMonth.setMilliseconds(milliseconds);

						if (this.isFieldSet(Calendar.WEEK_OF_MONTH)) {
							day = this.internalGet(Calendar.WEEK_OF_MONTH - 1)
									* 7 - truncMonth.getDay();

							if (this.isFieldSet(Calendar.DAY_OF_WEEK)) {
								day += this.internalGet(Calendar.DAY_OF_WEEK);
							}

						} else {

							if (this.isFieldSet(Calendar.DAY_OF_WEEK)) {
								var fistDay = truncMonth.getDay(), dayOfWeek = this
										.internalGet(Calendar.DAY_OF_WEEK);
								while (fistDay == dayOfWeek) {
									fistDay++;
									if (fistDay >= 7) {
										fistDay = 0;
									}
									day++;
								}
							}
							// We are basing this on the day-of-week-in-month.
							// The only
							// trickiness occurs if the day-of-week-in-month is
							// negative.
							if (this.isFieldSet(Calendar.DAY_OF_WEEK_IN_MONTH)) {
								day = this
										.internalGet(Calendar.DAY_OF_WEEK_IN_MONTH - 1) * 7 + 1;
							}
						}
					}
				} else {

					var truncMonth = new Date();
					truncMonth.setFullYear(year);
					truncMonth.setMonth(month);
					truncMonth.setDate(day);
					truncMonth.setHours(hours);
					truncMonth.setMinutes(minutes);
					truncMonth.setSeconds(seconds);
					truncMonth.setMilliseconds(milliseconds);
					// We are on the first day of the year.
					if (this.isFieldSet(Calendar.DAY_OF_YEAR)) {
						// Add the offset, then subtract 1. (Make sure to avoid
						// underflow.)
						var dayOfYear = this.internalGet(Calendar.DAY_OF_YEAR);

						while (true) {
							if (month >= 12
									|| truncMonth.getTime()
											% GregorianCalendar.ONE_DAY + 1 >= dayOfYear) {
								break;
							}
							truncMonth.setMonth(++month);
						}
						truncMonth.setMonth(--month);
						day = truncMonth.getTime() % GregorianCalendar.ONE_DAY
								+ 1;

					} else {
						if (this.isFieldSet(Calendar.DAY_OF_WEEK)) {
							var fistDay = truncMonth.getDay(), dayOfWeek = this
									.internalGet(Calendar.DAY_OF_WEEK);
							while (fistDay == dayOfWeek) {
								fistDay++;
								if (fistDay >= 7) {
									fistDay = 0;
								}
								day++;
							}
						}
					}
				}

				var timeDate = new Date();

				timeDate.setFullYear(year);
				timeDate.setMonth(month);
				timeDate.setDate(day);
				timeDate.setHours(hours);
				timeDate.setMinutes(minutes);
				timeDate.setSeconds(seconds);
				timeDate.setMilliseconds(milliseconds);

				var millis = timeDate.getTime();

				if (this.isFieldSet(Calendar.HOUR_OF_DAY)) {
					millis += this.internalGet(Calendar.HOUR_OF_DAY);
				} else {
					millis += this.internalGet(Calendar.HOUR);
					// The default value of AM_PM is 0 which designates AM.
					if (this.isFieldSet(Calendar.AM_PM)) {
						millis += 12 * this.internalGet(Calendar.AM_PM);
					}
				}
				millis *= 60;
				millis += this.internalGet(Calendar.MINUTE);
				millis *= 60;
				millis += this.internalGet(Calendar.SECOND);
				millis *= 1000;
				millis += this.internalGet(Calendar.MILLISECOND);

				this.time = millis + timeDate.getTimezoneOffset() * 60 * 1000;
			},

			"protected computeFields" : function() {

				var Calendar = js.util.Calendar, GregorianCalendar = js.util.GregorianCalendar, zone = new Date(
						this.time), offset = zone.getTimezoneOffset() * 60 * 1000,

				date = new Date(this.time + offset),

				year = date.getFullYear(), month = date.getMonth(), dayOfMonth = date
						.getDate(), dayOfWeek = date.getDay(), hours = date
						.getHours(), minutes = date.getMinutes(), seconds = date
						.getSeconds(), milliseconds = date.getMilliseconds();

				var truncYear = new Date();
				truncYear.setFullYear(year);
				truncYear.setMonth(0);
				truncYear.setDate(1);
				truncYear.setHours(0);
				truncYear.setMinutes(0);
				truncYear.setSeconds(0);
				truncYear.setMilliseconds(0);

				var dayOfYear = (this.time + offset - truncYear.getTime())
						% GregorianCalendar.ONE_DAY + 1, weekOfYear = dayOfYear % 7;

				truncYear.setMonth(month);
				var truncMonth = truncYear, weekOfMonth = (truncMonth.getDate() + truncMonth
						.getDay()) % 7;

				this.internalSet(Calendar.YEAR, year);
				this.internalSet(Calendar.MONTH, month);
				this.internalSet(Calendar.WEEK_OF_YEAR, weekOfYear);
				this.internalSet(Calendar.WEEK_OF_MONTH, weekOfMonth);
				this.internalSet(Calendar.DAY_OF_MONTH, dayOfMonth);
				this.internalSet(Calendar.DAY_OF_YEAR, dayOfYear);
				this.internalSet(Calendar.DAY_OF_WEEK, dayOfWeek);
				this.internalSet(Calendar.DAY_OF_WEEK_IN_MONTH,
						(dayOfMonth % 7) + 1);
				this.internalSet(Calendar.AM_PM, hours > 11 ? 1 : 0);
				this
						.internalSet(Calendar.HOUR, hours > 11 ? hours - 12
								: hours);
				this.internalSet(Calendar.HOUR_OF_DAY, hours);
				this.internalSet(Calendar.MINUTE, minutes);
				this.internalSet(Calendar.SECOND, seconds);
				this.internalSet(Calendar.MILLISECOND, milliseconds);
			},

			"add" : function(field, amount) {
				var Calendar = js.util.Calendar;
				// If amount == 0, do nothing even the given field is out of
				// range. This is tested by JCK.
				if (amount == 0) {
					return; // Do nothing!
				}

				if (field < 0) {
					throw new js.lang.IllegalArgumentException();
				}

				// Sync the time and calendar fields.
				this.complete();

				if (field == Calendar.YEAR) {
					var year = this.internalGet(Calendar.YEAR);
					year += amount;
					if (year > 0) {
						this.setField(Calendar.YEAR, year);
					} else { // year <= 0
						this.setField(Calendar.YEAR, 1 - year);
					}

					var truncYear = new Date();
					truncYear.setFullYear(year);
					truncYear.setMonth(this.internalGet(Calendar.MONTH));
					truncYear.setDate(this.internalGet(Calendar.DAY_OF_MONTH));
					truncYear.setHours(this.internalGet(Calendar.HOUR));
					truncYear.setMinutes(this.internalGet(Calendar.MINUTE));
					truncYear.setSeconds(this.internalGet(Calendar.SECOND));
					truncYear.setMilliseconds(this
							.internalGet(Calendar.MILLISECOND));

					this.setTime(truncYear);

				} else if (field == Calendar.MONTH) {
					var month = this.internalGet(MONTH) + amount;
					var year = this.internalGet(YEAR);

					if (month > Calendar.DECEMBER) {
						year += month / 12;
						month %= 12;
					} else if (month < Calendar.JANUARY) {
						year -= (12 - month) / 12;
						month = 12 + month % 12;
					}

					var truncYear = new Date();
					truncYear.setFullYear(year);
					truncYear.setMonth(month);
					truncYear.setDate(this.internalGet(Calendar.DAY_OF_MONTH));
					truncYear.setHours(this.internalGet(Calendar.HOUR));
					truncYear.setMinutes(this.internalGet(Calendar.MINUTE));
					truncYear.setSeconds(this.internalGet(Calendar.SECOND));
					truncYear.setMilliseconds(this
							.internalGet(Calendar.MILLISECOND));

					this.setTime(truncYear);

				} else {
					var delta = amount;
					switch (field) {
					// Handle the time fields here. Convert the given
					// amount to milliseconds and call setTimeInMillis.
					case Calendar.HOUR:
					case Calendar.HOUR_OF_DAY:
						delta *= 60 * 60 * 1000; // hours to minutes
						break;

					case Calendar.MINUTE:
						delta *= 60 * 1000; // minutes to seconds
						break;

					case Calendar.SECOND:
						delta *= 1000; // seconds to milliseconds
						break;

					case Calendar.MILLISECOND:
						break;

					// Handle week, day and AM_PM fields which involves
					// time zone offset change adjustment. Convert the
					// given amount to the number of days.
					case Calendar.WEEK_OF_YEAR:
					case Calendar.WEEK_OF_MONTH:
					case Calendar.DAY_OF_WEEK_IN_MONTH:
						delta *= 7;
						break;

					case Calendar.DAY_OF_MONTH: // synonym of DATE
					case Calendar.DAY_OF_YEAR:
					case Calendar.DAY_OF_WEEK:
						break;

					case Calendar.AM_PM:
						// Convert the amount to the number of days (delta)
						// and +12 or -12 hours (timeOfDay).
						var am_pm = this.internalGet(Calendar.AM_PM);
						if (am_pm == amount) {
							return;
						} else if (am_pm > amount) {
							delta = -amount / 2;
						} else {
							delta = amount / 2;
						}
						break;
					}

					// The time fields don't require time zone offset change
					// adjustment.
					if (field >= Calendar.HOUR) {
						this.setTimeInMillis(this.time + delta);
					} else {

						this.setTimeInMillis(this.time + delta
								* GregorianCalendar.ONE_DAY);
					}

				}

			}
		});