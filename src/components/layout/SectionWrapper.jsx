import PropTypes from 'prop-types';

const SectionWrapper = ({ children, className = "", title, subtitle }) => {
  return (
    <div className={`min-h-screen w-full relative overflow-hidden ${className}`}>
      <div className="section-content">
        <div className="content-wrapper">
          {/* Section Header - Standardized */}
          {title && (
            <div className="text-center mb-8 pt-8">
              <h2 className="section-title">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          
          {/* Section Content */}
          <div className="flex-1 flex flex-col justify-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

SectionWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string
};

export default SectionWrapper;