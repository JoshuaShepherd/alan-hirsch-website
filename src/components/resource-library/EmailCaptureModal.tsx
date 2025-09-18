'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Download, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LeadMagnet, EmailCaptureField } from '@/types/resource-library';

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  resource: LeadMagnet;
  onSuccess: () => void;
}

interface FormData {
  [key: string]: string | string[] | boolean;
}

const EmailCaptureModal: React.FC<EmailCaptureModalProps> = ({
  isOpen,
  onClose,
  resource,
  onSuccess
}) => {
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const form = resource.emailCaptureForm;

  if (!form) {
    return null;
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    form.fields.forEach((field) => {
      if (field.required) {
        const value = formData[field.name];
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          newErrors[field.name] = `${field.label} is required`;
        }
        
        if (field.type === 'email' && value && typeof value === 'string') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            newErrors[field.name] = 'Please enter a valid email address';
          }
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call for email capture
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Implement actual email capture API
      console.log('Email capture data:', {
        resource: resource.id,
        formData,
        tags: form.tags
      });

      // Success - trigger download
      onSuccess();
    } catch (error) {
      console.error('Email capture failed:', error);
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (fieldName: string, value: string | string[] | boolean) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    // Clear field error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const renderField = (field: EmailCaptureField) => {
    const fieldError = errors[field.name];

    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={(formData[field.name] as string) || ''}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              className={fieldError ? 'border-red-500' : ''}
            />
            {fieldError && (
              <p className="text-sm text-red-500">{fieldError}</p>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Select
              value={(formData[field.name] as string) || ''}
              onValueChange={(value) => handleFieldChange(field.name, value)}
            >
              <SelectTrigger className={fieldError ? 'border-red-500' : ''}>
                <SelectValue placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldError && (
              <p className="text-sm text-red-500">{fieldError}</p>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.name} className="space-y-3">
            <Label>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <div className="grid grid-cols-1 gap-2">
              {field.options?.map((option) => {
                const selectedOptions = (formData[field.name] as string[]) || [];
                const isChecked = selectedOptions.includes(option);
                
                return (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${field.name}-${option}`}
                      checked={isChecked}
                      onCheckedChange={(checked: boolean) => {
                        const currentOptions = (formData[field.name] as string[]) || [];
                        let newOptions: string[];
                        
                        if (checked) {
                          newOptions = [...currentOptions, option];
                        } else {
                          newOptions = currentOptions.filter(o => o !== option);
                        }
                        
                        handleFieldChange(field.name, newOptions);
                      }}
                    />
                    <Label
                      htmlFor={`${field.name}-${option}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {option}
                    </Label>
                  </div>
                );
              })}
            </div>
            {fieldError && (
              <p className="text-sm text-red-500">{fieldError}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-indigo-600" />
            {form.title}
          </DialogTitle>
          <DialogDescription>
            {form.description}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Resource Preview */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            {resource.thumbnailUrl && (
              <img
                src={resource.thumbnailUrl}
                alt={resource.title}
                className="w-12 h-12 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <h4 className="font-medium text-ink">{resource.title}</h4>
              <p className="text-sm text-graphite">{resource.shortDescription}</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {form.fields.map(renderField)}
          </div>

          {/* General Error */}
          {errors.general && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
          )}

          {/* Privacy Notice */}
          <div className="text-xs text-graphite bg-gray-50 p-3 rounded-lg">
            <p>
              By downloading this resource, you agree to receive occasional updates about 
              Alan Hirsch's work and related content. You can unsubscribe at any time.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Get Download
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailCaptureModal;
