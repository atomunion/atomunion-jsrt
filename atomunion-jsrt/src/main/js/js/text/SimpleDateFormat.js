/*
 * ! JSRT JavaScript Library 0.1.1 lico.atom@gmail.com
 * 
 * Copyright 2008, 2014 Atom Union, Inc. Released under the MIT license
 * 
 * Date: Feb 16, 2014
 */

$import("js.text.DateFormat");

/**
 * 字母 日期或时间元素 表示 示例
 * 
 * G Era 标志符 Text AD y 年 Year 1996; 96
 * 
 * M 年中的月份 Month July; Jul;07
 * 
 * w 年中的周数 Number 27
 * 
 * W 月份中的周数 Number 2
 * 
 * D 年中的天数 Number 189
 * 
 * d 月份中的天数 Number 10
 * 
 * F 月份中的星期 Number 2
 * 
 * E 星期中的天数 Text Tuesday; Tue
 * 
 * a Am/pm 标记 Text PM
 * 
 * H 一天中的小时数（0-23） Number 0
 * 
 * k 一天中的小时数（1-24） Number 24
 * 
 * K am/pm 中的小时数（0-11） Number 0
 * 
 * h am/pm 中的小时数（1-12） Number 12
 * 
 * m 小时中的分钟数 Number 30
 * 
 * s 分钟中的秒数 Number 55
 * 
 * S 毫秒数 Number 978
 * 
 * z 时区 General time zone Pacific Standard Time; PST; GMT-08:00
 * 
 * Z 时区
 */
Class
		.forName({
			name : 'abstract class js.text.SimpleDateFormat extends js.text.DateFormat',
			'private _pattern' : null,
			'private compiledPattern':null,
			SimpleDateFormat : function(pattern) {
				if (pattern == null) {
		            throw new js.lang.NullPointerException();
		        }
				this._pattern = pattern;
				this.initializeCalendar();
				this.initialize();
			},

		    /* Initialize compiledPattern and numberFormat fields */
		    'private initialize' : function() {
		        // Verify and compile the given pattern.
		        this.compiledPattern = this.compile(this.pattern);
	
		        
		    },
		    
			'private initializeCalendar':function() {
		        if (this.calendar == null) {
		            // The format object must be constructed using the symbols
					// for this zone.
		            // However, the calendar should use the current default
					// TimeZone.
		            // If this is not contained in the locale zone strings, then
					// the zone
		            // will be formatted using generic GMT+/-H:MM nomenclature.
		        	this.calendar = js.lang.Calendar.getInstance();
		        }
		    },
		    
		    /**
			 * Returns the compiled form of the given pattern. The syntax of the
			 * compiled pattern is: <blockquote> CompiledPattern: EntryList
			 * EntryList: Entry EntryList Entry Entry: TagField TagField data
			 * TagField: Tag Length TaggedData Tag: pattern_char_index
			 * TAG_QUOTE_CHARS Length: short_length long_length TaggedData:
			 * TAG_QUOTE_ASCII_CHAR ascii_char
			 * 
			 * </blockquote>
			 * 
			 * where `short_length' is an 8-bit unsigned integer between 0 and
			 * 254. `long_length' is a sequence of an 8-bit integer 255 and a
			 * 32-bit signed integer value which is split into upper and lower
			 * 16-bit fields in two char's. `pattern_char_index' is an 8-bit
			 * integer between 0 and 18. `ascii_char' is an 7-bit ASCII
			 * character value. `data' depends on its Tag value.
			 * <p>
			 * If Length is short_length, Tag and short_length are packed in a
			 * single char, as illustrated below. <blockquote> char[0] = (Tag <<
			 * 8) | short_length; </blockquote>
			 * 
			 * If Length is long_length, Tag and 255 are packed in the first
			 * char and a 32-bit integer, as illustrated below. <blockquote>
			 * char[0] = (Tag << 8) | 255; char[1] = (char) (long_length >>>
			 * 16); char[2] = (char) (long_length & 0xffff); </blockquote>
			 * <p>
			 * If Tag is a pattern_char_index, its Length is the number of
			 * pattern characters. For example, if the given pattern is "yyyy",
			 * Tag is 1 and Length is 4, followed by no data.
			 * <p>
			 * If Tag is TAG_QUOTE_CHARS, its Length is the number of char's
			 * following the TagField. For example, if the given pattern is
			 * "'o''clock'", Length is 7 followed by a char sequence of
			 * <code>o&nbs;'&nbs;c&nbs;l&nbs;o&nbs;c&nbs;k</code>.
			 * <p>
			 * TAG_QUOTE_ASCII_CHAR is a special tag and has an ASCII character
			 * in place of Length. For example, if the given pattern is "'o'",
			 * the TaggedData entry is
			 * <code>((TAG_QUOTE_ASCII_CHAR&nbs;<<&nbs;8)&nbs;|&nbs;'o')</code>.
			 * 
			 * @exception NullPointerException
			 *                if the given pattern is null
			 * @exception IllegalArgumentException
			 *                if the given pattern is invalid
			 */
		    'private compile':function(pattern) {
		    	//TODO
		        int length = pattern.length();
		        boolean inQuote = false;
		        StringBuilder compiledPattern = new StringBuilder(length * 2);
		        StringBuilder tmpBuffer = null;
		        int count = 0;
		        int lastTag = -1;

		        for (var i = 0; i < length; i++) {
		            char c = pattern.charAt(i);

		            if (c == '\'') {
		                // '' is treated as a single quote regardless of being
		                // in a quoted section.
		                if ((i + 1) < length) {
		                    c = pattern.charAt(i + 1);
		                    if (c == '\'') {
		                        i++;
		                        if (count != 0) {
		                            encode(lastTag, count, compiledPattern);
		                            lastTag = -1;
		                            count = 0;
		                        }
		                        if (inQuote) {
		                            tmpBuffer.append(c);
		                        } else {
		                            compiledPattern.append((char)(TAG_QUOTE_ASCII_CHAR << 8 | c));
		                        }
		                        continue;
		                    }
		                }
		                if (!inQuote) {
		                    if (count != 0) {
		                        encode(lastTag, count, compiledPattern);
		                        lastTag = -1;
		                        count = 0;
		                    }
		                    if (tmpBuffer == null) {
		                        tmpBuffer = new StringBuilder(length);
		                    } else {
		                        tmpBuffer.setLength(0);
		                    }
		                    inQuote = true;
		                } else {
		                    int len = tmpBuffer.length();
		                    if (len == 1) {
		                        char ch = tmpBuffer.charAt(0);
		                        if (ch < 128) {
		                            compiledPattern.append((char)(TAG_QUOTE_ASCII_CHAR << 8 | ch));
		                        } else {
		                            compiledPattern.append((char)(TAG_QUOTE_CHARS << 8 | 1));
		                            compiledPattern.append(ch);
		                        }
		                    } else {
		                        encode(TAG_QUOTE_CHARS, len, compiledPattern);
		                        compiledPattern.append(tmpBuffer);
		                    }
		                    inQuote = false;
		                }
		                continue;
		            }
		            if (inQuote) {
		                tmpBuffer.append(c);
		                continue;
		            }
		            if (!(c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z')) {
		                if (count != 0) {
		                    encode(lastTag, count, compiledPattern);
		                    lastTag = -1;
		                    count = 0;
		                }
		                if (c < 128) {
		                    // In most cases, c would be a delimiter, such as
							// ':'.
		                    compiledPattern.append((char)(TAG_QUOTE_ASCII_CHAR << 8 | c));
		                } else {
		                    // Take any contiguous non-ASCII alphabet characters
							// and
		                    // put them in a single TAG_QUOTE_CHARS.
		                    int j;
		                    for (j = i + 1; j < length; j++) {
		                        char d = pattern.charAt(j);
		                        if (d == '\'' || (d >= 'a' && d <= 'z' || d >= 'A' && d <= 'Z')) {
		                            break;
		                        }
		                    }
		                    compiledPattern.append((char)(TAG_QUOTE_CHARS << 8 | (j - i)));
		                    for (; i < j; i++) {
		                        compiledPattern.append(pattern.charAt(i));
		                    }
		                    i--;
		                }
		                continue;
		            }

		            int tag;
		            if ((tag = DateFormatSymbols.patternChars.indexOf(c)) == -1) {
		                throw new IllegalArgumentException("Illegal pattern character " +
		                                                   "'" + c + "'");
		            }
		            if (lastTag == -1 || lastTag == tag) {
		                lastTag = tag;
		                count++;
		                continue;
		            }
		            encode(lastTag, count, compiledPattern);
		            lastTag = tag;
		            count = 1;
		        }

		        if (inQuote) {
		            throw new IllegalArgumentException("Unterminated quote");
		        }

		        if (count != 0) {
		            encode(lastTag, count, compiledPattern);
		        }

		        // Copy the compiled pattern to a char array
		        int len = compiledPattern.length();
		        var r = new char[len];
		        compiledPattern.getChars(0, len, r, 0);
		        return r;
		    },
			/** 格式化一个对象以生成一个字符串。 */
			'private formatDate' : function(date) {
				//TODO
		        // Convert input date to time field list
				this.calendar.setTime(date);

		        boolean useDateFormatSymbols = useDateFormatSymbols();

		        for (var i = 0; i < compiledPattern.length; ) {
		            int tag = compiledPattern[i] >>> 8;
		            int count = compiledPattern[i++] & 0xff;
		            if (count == 255) {
		                count = compiledPattern[i++] << 16;
		                count |= compiledPattern[i++];
		            }

		            switch (tag) {
		            case TAG_QUOTE_ASCII_CHAR:
		                toAppendTo.append(count);
		                break;

		            case TAG_QUOTE_CHARS:
		                toAppendTo.append(compiledPattern, i, count);
		                i += count;
		                break;

		            default:
		                subFormat(tag, count, delegate, toAppendTo, useDateFormatSymbols);
		                break;
		            }
		        }
		        return toAppendTo;
		    
			},
			/** 从给定字符串的开始分析文本，以生成一个日期。 */
			'parse' : function(source) {
			}
		});
