import {
  convertObjectKeysToCamelCase,
  convertObjectKeysToSnakeCase,
  convertStringToCamelCase,
  convertStringToSnakeCase,
} from '../convertStringCases';

describe('convertStringCases', () => {
  it('should convert a string to snake case', () => {
    expect(convertStringToSnakeCase('string')).toEqual('string');

    expect(convertStringToSnakeCase('stringWithCamelCase')).toEqual(
      'string_with_camel_case'
    );

    expect(convertStringToSnakeCase('string_with_snake_case')).toEqual(
      'string_with_snake_case'
    );

    expect(convertStringToSnakeCase('string-with-kebab-case')).toEqual(
      'string_with_kebab_case'
    );
  });

  it('should convert a string to camel case', () => {
    expect(convertStringToCamelCase('string')).toEqual('string');

    expect(convertStringToCamelCase('string_with_snake_case')).toEqual(
      'stringWithSnakeCase'
    );

    expect(convertStringToCamelCase('stringWithCamelCase')).toEqual(
      'stringWithCamelCase'
    );

    expect(convertStringToCamelCase('string-with-kebab-case')).toEqual(
      'stringWithKebabCase'
    );
  });

  it('should convert an object keys to snake case', () => {
    expect(
      convertObjectKeysToCamelCase({
        keywithoutcase: 'value',
        key2withoutcase: 'value2',
      })
    ).toEqual({
      keywithoutcase: 'value',
      key2withoutcase: 'value2',
    });

    expect(
      convertObjectKeysToSnakeCase({
        keyCamelCase: 'value',
        key2CamelCase: 'value',
      })
    ).toEqual({
      key_camel_case: 'value',
      key2_camel_case: 'value',
    });

    expect(
      convertObjectKeysToSnakeCase({
        key_snake_case: 'value',
        key2_snake_case: 'value2',
      })
    ).toEqual({
      key_snake_case: 'value',
      key2_snake_case: 'value2',
    });

    expect(
      convertObjectKeysToSnakeCase({
        'key-kebab-case': 'value',
        'key2-kebab-case': 'value2',
      })
    ).toEqual({
      key_kebab_case: 'value',
      key2_kebab_case: 'value2',
    });
  });

  it('should convert an object to camel case', () => {
    expect(
      convertObjectKeysToCamelCase({
        keywithoutcase: 'value',
        key2withoutcase: 'value2',
      })
    ).toEqual({
      keywithoutcase: 'value',
      key2withoutcase: 'value2',
    });

    expect(
      convertObjectKeysToCamelCase({
        keyCamelCase: 'value',
        key2CamelCase: 'value2',
      })
    ).toEqual({
      keyCamelCase: 'value',
      key2CamelCase: 'value2',
    });

    expect(
      convertObjectKeysToCamelCase({
        key_snake_case: 'value',
        key2_snake_case: 'value2',
      })
    ).toEqual({
      keySnakeCase: 'value',
      key2SnakeCase: 'value2',
    });

    expect(
      convertObjectKeysToCamelCase({
        'key-kebab-case': 'value',
        'key2-kebab-case': 'value2',
      })
    ).toEqual({
      keyKebabCase: 'value',
      key2KebabCase: 'value2',
    });
  });
});
