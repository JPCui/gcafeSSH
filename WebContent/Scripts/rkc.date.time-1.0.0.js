// get date now
function getCurrentDate() {
    return new Date();
}

// get current year
function getCurrentYear(currentDate) {
    if (currentDate == undefined) {
        return (new Date()).getFullYear();
    }
    return new Date().getFullYear();
}

// get current month
function getCurrentMonth(currentDate) {
    if (currentDate == undefined) {
        return right("00" + ((new Date()).getMonth() + 1), 2);
    }
    return right("00" + (currentDate.getMonth() + 1), 2);
}

// get current day
function getCurrentDay(currentDate) {
    if (currentDate == undefined) {
        return right("00" + (new Date()).getDate(), 2);
    }
    return right("00" + currentDate.getDate(), 2);
}

// get current hour
function getCurrentHour(currentDate) {
    if (currentDate == undefined) {
        return right("00" + (new Date()).getHours(), 2);
    }
    return right("00" + currentDate.getHours(), 2);
}

// get current hour
function getCurrentMinute(currentDate) {
    if (currentDate == undefined) {
        return right("00" + (new Date()).getMinutes(), 2);
    }
    return right("00" + currentDate.getMinutes(), 2);
}

// get current sencond
function getCurrentSecond(currentDate) {
    if (currentDate == undefined) {
        return right("00" + (new Date()).getSeconds(), 2);
    }
    return right("00" + currentDate.getSeconds(), 2);
}

// get current millisencond
function getCurrentMillisecond(currentDate) {
    if (currentDate == undefined) {
        return right("000" + (new Date()).getMilliseconds(), 3);
    }
    return right("000" + currentDate.getMilliseconds(), 3);
}

/// <summary>
/// 判断是否为日期
/// </summary>
/// <param name="str">日期字符串</param>
/// <returns>true|false</returns>
/// <remarks>
/// yyyy-mm-dd
/// yyyy/mm/dd
/// yyyy.mm.dd
/// </remarks>
function isDate(str) {

    // 不是数字0-9，横杠，斜杠，点
    var re = /[^0-9\-\/\.]/;
    if (re.test(str))
        return false;

    re = /^(((([13579][26]00)|([2468][048]00)|([1-9][0-9][13579][26])|([1-9][0-9][2468][048])|([1-9][0-9][0][48]))[-\.\/]?(((10|12|([0]?[13578]))[-\.\/]?(31|30|([12][0-9])|([0]?[1-9])))|((11|([0]?[469]))[-\.\/]?(30|([12][0-9])|([0]?[1-9])))|((2|02)[-\.\/]?(([12][0-9])|([0]?[1-9])))))|((([13579][01345789]00)|([2468][1235679]00)|([1-9][0-9][13579][01345789])|([1-9][0-9][2468][1235679])|([1-9][0-9][0][1235679]))[-\.\/]?(((10|12|([0]?[13578]))[-\.\/]?(31|30|([12][0-9])|([0]?[1-9])))|((11|([0]?[469]))[-\.\/]?(30|([12][0-9])|([0]?[1-9])))|((2|02)[-\.\/]?(([2][0-8])|([1][0-9])|([0]?[1-9]))))))$/
    return re.test(str);
}

/// <summary>
/// 判断是否为时间
/// </summary>
/// <param name="str">时间字符串</param>
/// <returns>true|false</returns>
/// <remarks>
/// hh:mm:ss
/// hh:mm:ss.fff
/// hh:mm:ss fff
/// </remarks>
function isTime(str) {

    // 不是数字0-9，冒号，点，空格
    var re = /[^0-9\:\.\s]/;
    if (re.test(str))
        return false;

    re = /^(([0]?[0-9])|(1[0-9])|(2[0-4]))[\:](([0]?[0-9])|([1-5][0-9]))[\:](([0]?[0-9])|([1-5][0-9]))([\.\s]([0-9][0-9][0-9]))?$/
    return re.test(str);
}

/// <summary>
/// 判断是否为日期时间
/// </summary>
/// <param name="str">日期时间字符串</param>
/// <returns>true|false</returns>
/// <remarks>
/// 日期格式与时间格式的各种组合，日期与时间以空格分隔
/// yyyy-mm-dd
/// yyyy/mm/dd
/// yyyy.mm.dd
/// hh:mm:ss
/// hh:mm:ss.fff
/// hh:mm:ss fff
/// 例如：yyyy/mm/dd hh:mm:ss
/// </remarks>
function isDateTime(str) {

    // 判断日期与时间之间是否以空格分隔
    if (str.indexOf(" ") == -1)
        return false;

    // 截取日期和时间
    var date = str.substring(0, str.indexOf(" "));
    var time = str.substring(str.indexOf(" ") + 1);

    // 判断是否为合法日期
    if (!isDate(date))
        return false;

    // 判断是否为合法时间
    if (!isTime(time))
        return false;

    return true;
}

/// <summary>
/// 检查日期时间的每一项
/// 检查日期时间中每一项的合法情况，且要求必须自左向右依次有值，不能间隔有值
/// 并不检查是否为完整日期格式
/// </summary>
/// <param name="year">年</param>
/// <param name="month">月</param>
/// <param name="day">日</param>
/// <param name="hour">时</param>
/// <param name="minute">分</param>
/// <param name="second">秒</param>
/// <param name="millisecond">毫秒</param>
/// <returns>true|false</returns>
function chkDateTimeItem(year, month, day, hour, minute, second, millisecond) {

    // 年为空时
    if (isEmpty(year)) {
        return isEmpty(month)
        || isEmpty(day)
        || isEmpty(hour)
        || isEmpty(minute)
        || isEmpty(second)
        || isEmpty(millisecond);
    }
    else {
        if (!isNumber(year))
            return false;
        if (Number(year) < 1900)
            return false;
    }

    // 月为空时
    if (isEmpty(month)) {
        if (!isEmpty(day)
        || !isEmpty(hour)
        || !isEmpty(minute)
        || !isEmpty(second)
        || !isEmpty(millisecond)) {
            return false;
        }
    }
    else {
        if (!isNumber(month))
            return false;
        if (Number(month) < 1 || Number(month) > 12)
            return false;
    }

    // 日为空时
    if (isEmpty(day)) {
        if (!isEmpty(hour)
        || !isEmpty(minute)
        || !isEmpty(second)
        || !isEmpty(millisecond)) {
            return false;
        }
    }
    else {
        if (!isNumber(day))
            return false;
        if (Number(day) < 1 || Number(day) > 31)
            return false;
    }

    // 时为空时
    if (isEmpty(hour)) {
        if (!isEmpty(minute)
        || !isEmpty(second)
        || !isEmpty(millisecond)) {
            return false;
        }
    }
    else {
        if (!isNumber(hour))
            return false;
        if (Number(hour) < 0 || Number(hour) > 24)
            return false;
    }

    // 分为空时
    if (isEmpty(minute)) {
        if (!isEmpty(second)
        || !isEmpty(millisecond)) {
            return false;
        }
    }
    else {
        if (!isNumber(minute))
            return false;
        if (Number(minute) < 0 || Number(minute) > 60)
            return false;
    }

    // 秒为空时
    if (isEmpty(second)) {
        if (!isEmpty(millisecond)) {
            return false;
        }
    }
    else {
        if (!isNumber(second))
            return false;
        if (Number(second) < 0 || Number(second) > 60)
            return false;
    }

    // 毫秒不为空时
    if (!isEmpty(millisecond)) {
        if (!isNumber(millisecond))
            return false;
        if (Number(millisecond) < 0 || Number(millisecond) > 999)
            return false;
    }

    if (!isEmpty(day)) {
        if (!isDate(year + "/" + month + "/" + day)) {
            return false;
        }
    }
    return true;
}

/// <summary>
/// 检查两个日期时间的每一项
/// 检查日期时间中每一项的合法情况，且要求必须自左向右依次有值，不能间隔有值，并做比较判断
/// 相对每一项如果都有值的情况下，前者要小于后者
/// 并不检查是否为完整日期格式
/// </summary>
/// <param name="year">年</param>
/// <param name="month">月</param>
/// <param name="day">日</param>
/// <param name="hour">时</param>
/// <param name="minute">分</param>
/// <param name="second">秒</param>
/// <param name="millisecond">毫秒</param>
/// <param name="year2">年</param>
/// <param name="month2">月</param>
/// <param name="day2">日</param>
/// <param name="hour2">时</param>
/// <param name="minute2">分</param>
/// <param name="second2">秒</param>
/// <param name="millisecond2">毫秒</param>
/// <returns>true|false</returns>
function chkTwoDateTimeItem(year, month, day, hour, minute, second, millisecond
                            , year2, month2, day2, hour2, minute2, second2, millisecond2) {

    // 检查日期时间的每一项
    if (!chkDateTimeItem(year, month, day, hour, minute, second, millisecond))
        return false;

    // 检查日期时间的每一项
    if (!chkDateTimeItem(year2, month2, day2, hour2, minute2, second2, millisecond2))
        return false;

    // 比较判断
    var date = getCurrentDate();

    // 如果起始日期时间有为空的情况，应设置默认值
    year = isEmpty(year) ? "1900" : year;
    month = isEmpty(month) ? "01" : month;
    day = isEmpty(day) ? "01" : day;
    hour = isEmpty(hour) ? "00" : hour;
    minute = isEmpty(minute) ? "00" : minute;
    second = isEmpty(second) ? "00" : second;
    millisecond = isEmpty(millisecond) ? "000" : millisecond;

    // 如果结束日期时间有为空的情况，应设置默认值
    year2 = isEmpty(year2) ? getCurrentYear(date) : year2;
    month2 = isEmpty(month2) ? "12" : month2;
    day2 = isEmpty(day2) ? "31" : day2;
    hour2 = isEmpty(hour2) ? "24" : hour2;
    minute2 = isEmpty(minute2) ? "59" : minute2;
    second2 = isEmpty(second2) ? "59" : second2;
    millisecond2 = isEmpty(millisecond2) ? "999" : millisecond2;

    // 判断起始年要小于等于结束年
    if (Number(year) > Number(year2)) {
        return false;
    }
    if (Number(year) < Number(year2)) {
        return true;
    }

    // 判断起始月要小于等于结束月
    if (Number(month) > Number(month2)) {
        return false;
    }
    if (Number(month) < Number(month2)) {
        return true;
    }

    // 判断起始日要小于等于结束日
    if (Number(day) > Number(day2)) {
        return false;
    }
    if (Number(day) < Number(day2)) {
        return true;
    }

    // 判断起始时要小于等于结束时
    if (Number(hour) > Number(hour2)) {
        return false;
    }
    if (Number(hour) < Number(hour2)) {
        return true;
    }

    // 判断起始分要小于等于结束分
    if (Number(minute) > Number(minute2)) {
        return false;
    }
    if (Number(minute) < Number(minute2)) {
        return true;
    }

    // 判断起始秒要小于等于结束秒
    if (Number(second) > Number(second2)) {
        return false;
    }
    if (Number(second) < Number(second2)) {
        return true;
    }

    // 判断起始秒要小于等于结束秒
    if (Number(millisecond) > Number(millisecond2)) {
        return false;
    }
    if (Number(millisecond) < Number(millisecond2)) {
        return true;
    }

    return true;
}


/* --------------------------------------------------
* 以下是其他js文件中方法的拷贝，以保证该js文件的独立运行
-------------------------------------------------- */
/// <summary>
/// 移除字符串开始和结尾处的空白
/// </summary>
/// <param name="str">字符串</param>
/// <returns>字符串</returns>
function trim(str) {
    return (str || "").replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "");
}

/// <summary>
/// 判断是否为空
/// </summary>
/// <param name="str">字符串</param>
/// <returns>true|false</returns>
function isEmpty(str) {
    return str == "";
}

/// <summary>
/// 判断是否为数字
/// </summary>
/// <param name="str">字符串</param>
/// <returns>true|false</returns>
function isNumber(str) {
    var re = /^[\d]+$/
    return re.test(str);
}