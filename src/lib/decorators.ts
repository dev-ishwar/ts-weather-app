// Decorators allows to customize the classes and their members in a reusable way.
/*
 - Class decorators
 - Method decorators
 - property decorators
 - accessor decorators
 - parameter decorators
 */

// Method decorator
// @ts-ignore
export function loggedMethod(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;
  
    descriptor.value = function (...args: any[]) {
      console.log(`Calling ${propertyKey} with arguments:`, args);
      const result = originalMethod.apply(this, args);
      console.log(`Result of ${propertyKey}:`, result);
      return result;
    };
  
    return descriptor;
  }