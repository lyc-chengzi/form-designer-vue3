export enum EnumComponentType {
    page = 'PageRenderer',
    renderer = 'FdRenderer',
    layout = 'FdLayout',
    form = 'FdForm',
    row = 'FdRow',
    col = 'FdCol',
    layoutDesigner = 'FdLayoutDesigner',
    label = 'FdLabel',
    fieldItem = 'FdFielditem',
    button = 'FdButton',
    input = 'FdInput',
    textField = 'FdTextfield',
    number = 'FdNumber',
    integer = 'FdInteger',
    float = 'FdFloat',
    switch = 'FdSwitch',
    sliders = 'FdSliders',
    checkboxes = 'FdCheckboxes',
    radios = 'FdRadios',
    datePicker = 'FdDatePicker',
    textarea = 'FdTextarea',
    rate = 'FdRate',
    divider = 'FdDivider',
    select = 'FdSelect',
    demo1 = 'FdDemo1',
}

export enum EnumComponentGroup {
    page = '-1',
    layout = '0',
    base = '1',
    form = '2',
}

export enum EnumApiType {
    normal = '1', //普通api
    data = '2', //数据api，一个api列表里只有一个数据api，用于提供组件的动态数据源
}

export enum EnumEventType {
    click = 'click',
    mouseOver = 'mouseover',
    mouseLeave = 'mouseleave',
    focus = 'focus',
    change = 'change',
}

export enum EnumPropsValueType {
    string = 'string',
    number = 'number',
    boolean = 'boolean',
    array = 'array',
    object = 'object',
    expression = 'expression', // 变量，表达式
    function = 'function',
}
