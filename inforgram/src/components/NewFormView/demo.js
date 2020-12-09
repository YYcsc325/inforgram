import React, { useCallback, useMemo } from '@alipay/bigfish/react';
import { Col, Form, Select } from '@alipay/bigfish/antd';
import { useDidMount } from '~/util/adHook';
import { isPromise } from '~/util/is';

const formComponents = {
  select: Select,
};

const defaultCommonProps = {};
/**
 * * onStateChange 仅仅本次开发传入，后续将不会存在
 * * commonItemProps 仅仅本次开发传入，后续不会存在
 * @param {*} param0
 */
function ReportForm({
  config = [],
  form,
  commonItemProps = defaultCommonProps,
  onStateChange,
  onChange,
  layout = 'inline',
  name,
  reportAct,
  onFormInit,
  ...restProps
}) {
  const { getFieldDecorator } = form;

  useDidMount(() => {
    const mountCallback = async () => {
      if (onFormInit) {
        const result = onFormInit(form, name);
        if (isPromise(result)) {
          await result;
        }
      }
    };
    mountCallback();
  });

  return (
    <div>
      <Form layout={layout} {...restProps}>
        {config.map((item, i) => {
          const {
            type,
            key,
            formItemProps,
            connect,
            fieldProps,
            component,
            ...itemRestProps
          } = item;
          let Item = formComponents[type];
          if (!Item) return;

          if (connect && component) {
            const PacketItem = (props) => {
              const Comp = component;
              Comp.displayName = 'Connect(Item)';
              const handleChange = useCallback(
                (...args) => {
                  const args1 = args.concat({ ...commonItemProps, ...props, onStateChange });
                  if (props.onChange) props.onChange(...args1);

                  if (onChange && reportAct) onChange(form.getFieldsValue());
                },
                [props],
              );

              return (
                <Comp
                  {...commonItemProps}
                  {...props}
                  onStateChange={onStateChange}
                  onChange={handleChange}
                />
              );
            };
            Item = connect(PacketItem);
          }

          let FormItem = function ({ children, formItemProps, fieldProps }) {
            return (
              <Form.Item {...formItemProps}>
                {getFieldDecorator(item.key, fieldProps)(children)}
              </Form.Item>
            );
          };

          if (connect) {
            FormItem = connect(function ({ children, formItemProps, fieldProps, ...connectProps }) {
              fieldProps = blockProperty(fieldProps, 'initialValue', connectProps);

              return (
                <Form.Item {...formItemProps}>
                  {getFieldDecorator(item.key, fieldProps)(children)}
                </Form.Item>
              );
            });
          }

          return (
            <Col key={key} span={6} style={{ marginTop: i > 3 ? 20 : 0 }}>
              <FormItem formItemProps={formItemProps} fieldProps={fieldProps}>
                {<Item form={form} {...itemRestProps} />}
              </FormItem>
            </Col>
          );
        })}
      </Form>
    </div>
  );
}

function AdFormCheck({ form, ...restProps }) {
  // 这里有误
  const WithPropsReportForm = useMemo(
    () =>
      Form.create({
        onValuesChange: ({ onChange }, _, allValues) => {
          onChange && onChange(allValues);
        },
      })(ReportForm),
    [],
  );

  if (form) return <ReportForm form={form} {...restProps} reportAct />;
  return <WithPropsReportForm {...restProps} />;
}

export default AdFormCheck;

export function blockProperty(data, key, injectProps = {}) {
  const newData = { ...data };
  if (data && typeof data[`${key}Fn`] === 'function') {
    newData[key] = data[`${key}Fn`](injectProps);
    delete newData[`${key}Fn`];
  }
  return newData;
}