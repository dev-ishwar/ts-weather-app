// Decorators allows to customize the classes and their members in a reusable way.
/*
 - Class decorators
 - Method decorators
 - property decorators
 - accessor decorators
 - parameter decorators
 */

// Method decorator
export function loggedMethod(
    _target: any, // prefixed with _ to avoid build error - target' is declared but its value is never read.
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