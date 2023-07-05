// 现有{{x}}积分，其中{{y}}积分可以使用，可抵扣{{z}}元

enum State {
    Normal = 'Normal',
    MStart = 'Mustache_Start',
    Variable = 'Variable',
    MClose = 'Mustache_Close',
    Error = 'Error',
}

type StringParsed = {
    type: 'normal' | 'variable',
    text: string,
}

export default function parser(str: string) {
    let state = State.Normal;
    let curr = '';

    const data: StringParsed[] = [];

    for (let i=0; i<str.length;) {
        const currStr = str[i];
        const nextStr = str[i+1];

        state = handleStateTransfer(state, currStr, nextStr);
        if (state === State.Error) {
            throw new Error('出错了');
        }
        if (state === State.MStart || state === State.MClose) {
            i += 2;
            if (curr) {
                data.push({
                    type: state === State.MStart ? 'normal' : 'variable',
                    text: curr,
                });
                curr = '';
            }
        } else {
            i += 1;
            curr += currStr;
        }
    }
    if (curr && state === State.Normal) {
        data.push({
            type: 'normal',
            text: curr,
        });
    }
    return data;
}

function handleStateTransfer(state: State, currStr: string, nextStr: string): State {
    if (state === State.Normal && (currStr + nextStr) !== '{{') {
        return State.Normal;
    } else if (state === State.Normal && (currStr + nextStr) === '{{') {
        return State.MStart;
    } else if (state === State.MStart) {
        return State.Variable;
    } else if (state === State.Variable && (currStr + nextStr) !== '}}') {
        return State.Variable;
    } else if (state === State.Variable && (currStr + nextStr) === '}}') {
        return State.MClose;
    } else if (state === State.MClose) {
        return State.Normal;
    } else {
        return State.Error;
    }
}
